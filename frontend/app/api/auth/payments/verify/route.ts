import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getAuthUser } from "@/lib/auth"
import type { Payment, Subscription } from "@/lib/models/Payment"
import type { User } from "@/lib/models/User"
import { ObjectId } from "mongodb"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request)

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex")

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    const db = await getDatabase()
    const paymentsCollection = db.collection<Payment>("payments")
    const subscriptionsCollection = db.collection<Subscription>("subscriptions")
    const usersCollection = db.collection<User>("users")

    // Update payment status
    const payment = await paymentsCollection.findOneAndUpdate(
      {
        userId: new ObjectId(authUser.userId),
        gatewayOrderId: razorpay_order_id,
      },
      {
        $set: {
          gatewayPaymentId: razorpay_payment_id,
          status: "completed",
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Create subscription
    const planFeatures = {
      Basic: {
        personalTraining: false,
        nutritionConsultation: false,
        groupClasses: true,
        priorityBooking: false,
        customWorkoutPlans: true,
        customNutritionPlans: false,
        progressAnalytics: true,
        vipAccess: false,
      },
      Premium: {
        personalTraining: true,
        nutritionConsultation: true,
        groupClasses: true,
        priorityBooking: true,
        customWorkoutPlans: true,
        customNutritionPlans: true,
        progressAnalytics: true,
        vipAccess: false,
      },
      Elite: {
        personalTraining: true,
        nutritionConsultation: true,
        groupClasses: true,
        priorityBooking: true,
        customWorkoutPlans: true,
        customNutritionPlans: true,
        progressAnalytics: true,
        vipAccess: true,
      },
    }

    const newSubscription: Omit<Subscription, "_id"> = {
      userId: new ObjectId(authUser.userId),
      planType: payment.planType,
      status: "active",
      startDate: payment.planStartDate,
      endDate: payment.planEndDate,
      autoRenew: false,
      paymentId: payment._id!,
      features: planFeatures[payment.planType],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await subscriptionsCollection.insertOne(newSubscription)

    // Update user plan
    await usersCollection.updateOne(
      { _id: new ObjectId(authUser.userId) },
      {
        $set: {
          plan: payment.planType,
          planExpiresAt: payment.planEndDate,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({
      message: "Payment verified successfully",
      subscription: newSubscription,
    })
  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import express from "express"
import { ObjectId } from "mongodb"
import Razorpay from "razorpay"
import crypto from "crypto"
import { getDatabase } from "../config/database"
import { authenticateToken, type AuthRequest } from "../middleware/auth"
import { createError } from "../middleware/errorHandler"
import type { Payment, Subscription } from "../models/Payment"
import type { User } from "../models/User"

const router = express.Router()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const planPrices = {
  Basic: 2999,
  Premium: 4999,
  Elite: 7999,
}

// Create payment order
router.post("/create-order", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { planType } = req.body

    if (!planType || !planPrices[planType as keyof typeof planPrices]) {
      throw createError("Invalid plan type", 400)
    }

    const amount = planPrices[planType as keyof typeof planPrices]

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.user!.userId,
        planType,
      },
    })

    const db = getDatabase()
    const paymentsCollection = db.collection<Payment>("payments")

    // Create payment record
    const newPayment: Omit<Payment, "_id"> = {
      userId: new ObjectId(req.user!.userId),
      planType: planType as "Basic" | "Premium" | "Elite",
      amount,
      currency: "INR",
      paymentMethod: "card",
      paymentGateway: "razorpay",
      transactionId: order.id,
      gatewayPaymentId: "",
      gatewayOrderId: order.id,
      status: "pending",
      planStartDate: new Date(),
      planEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await paymentsCollection.insertOne(newPayment)

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    next(error)
  }
})

// Verify payment
router.post("/verify", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex")

    if (razorpay_signature !== expectedSign) {
      throw createError("Invalid payment signature", 400)
    }

    const db = getDatabase()
    const paymentsCollection = db.collection<Payment>("payments")
    const subscriptionsCollection = db.collection<Subscription>("subscriptions")
    const usersCollection = db.collection<User>("users")

    // Update payment status
    const payment = await paymentsCollection.findOneAndUpdate(
      {
        userId: new ObjectId(req.user!.userId),
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
      throw createError("Payment not found", 404)
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
      userId: new ObjectId(req.user!.userId),
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
      { _id: new ObjectId(req.user!.userId) },
      {
        $set: {
          plan: payment.planType,
          planExpiresAt: payment.planEndDate,
          updatedAt: new Date(),
        },
      },
    )

    res.json({
      message: "Payment verified successfully",
      subscription: newSubscription,
    })
  } catch (error) {
    next(error)
  }
})

export default router

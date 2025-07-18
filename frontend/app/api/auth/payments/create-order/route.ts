import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getAuthUser } from "@/lib/auth"
import type { Payment } from "@/lib/models/Payment"
import { ObjectId } from "mongodb"
import Razorpay from "razorpay"

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Missing Razorpay credentials")
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const planPrices = {
  Basic: 2999,
  Premium: 4999,
  Elite: 7999,
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request)

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { planType } = body

    if (!planType || !planPrices[planType as keyof typeof planPrices]) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 })
    }

    const amount = planPrices[planType as keyof typeof planPrices]

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: authUser.userId,
        planType,
      },
    })

    const db = await getDatabase()
    const paymentsCollection = db.collection<Payment>("payments")

    // Create payment record
    const newPayment: Omit<Payment, "_id"> = {
      userId: new ObjectId(authUser.userId),
      planType: planType as "Basic" | "Premium" | "Elite",
      amount,
      currency: "INR",
      paymentMethod: "card", // Will be updated after payment
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

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

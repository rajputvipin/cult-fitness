import type { ObjectId } from "mongodb"

export interface Payment {
  _id?: ObjectId
  userId: ObjectId
  planType: "Basic" | "Premium" | "Elite"
  amount: number
  currency: "INR"
  paymentMethod: "card" | "upi" | "netbanking"
  paymentGateway: "razorpay" | "stripe"
  transactionId: string
  gatewayPaymentId: string
  gatewayOrderId: string
  status: "pending" | "completed" | "failed" | "refunded"
  planStartDate: Date
  planEndDate: Date
  metadata?: {
    cardLast4?: string
    upiId?: string
    gatewayResponse?: any
  }
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  _id?: ObjectId
  userId: ObjectId
  planType: "Basic" | "Premium" | "Elite"
  status: "active" | "expired" | "cancelled" | "suspended"
  startDate: Date
  endDate: Date
  autoRenew: boolean
  paymentId: ObjectId
  features: {
    personalTraining: boolean
    nutritionConsultation: boolean
    groupClasses: boolean
    priorityBooking: boolean
    customWorkoutPlans: boolean
    customNutritionPlans: boolean
    progressAnalytics: boolean
    vipAccess: boolean
  }
  createdAt: Date
  updatedAt: Date
}

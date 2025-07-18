"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, CreditCard, Shield, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 2999,
    period: "month",
    description: "Perfect for beginners",
    features: [
      "Access to gym equipment",
      "Basic workout plans",
      "Mobile app access",
      "Progress tracking",
      "Community support",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 4999,
    period: "month",
    description: "Most popular choice",
    features: [
      "Everything in Basic",
      "Personal trainer sessions (4/month)",
      "Customized workout plans",
      "Nutrition consultation",
      "Group classes access",
      "Priority booking",
    ],
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 7999,
    period: "month",
    description: "Ultimate fitness package",
    features: [
      "Everything in Premium",
      "Unlimited personal training",
      "Custom meal plans",
      "Body composition analysis",
      "Recovery sessions",
      "VIP lounge access",
      "24/7 trainer support",
    ],
    popular: false,
  },
]

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]) // Default to Premium
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    upiId: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate payment processing
    toast({
      title: "Processing Payment...",
      description: "Please wait while we process your payment.",
    })

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `Welcome to ${selectedPlan.name} plan! Your fitness journey begins now.`,
      })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleRazorpayPayment = async () => {
    const res = await initializeRazorpay()
    if (!res) {
      alert("Razorpay SDK failed to load")
      return
    }

    // Create order on backend (mock data)
    const orderData = {
      amount: selectedPlan.price * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    }

    const options = {
      key: "rzp_test_1234567890", // Replace with your Razorpay key
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Cult Fitness",
      description: `${selectedPlan.name} Plan Subscription`,
      image: "/placeholder.svg?height=60&width=60",
      handler: (response: any) => {
        toast({
          title: "Payment Successful!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
        })
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#8b5cf6",
      },
    }

    const paymentObject = new (window as any).Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Fitness Plan
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for your fitness journey and unlock your potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedPlan.id === plan.id ? "ring-2 ring-purple-400 bg-white/10" : "bg-white/5 hover:bg-white/10"
              } backdrop-blur-sm border-white/10`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">₹{plan.price.toLocaleString()}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <CreditCard className="mr-2 h-6 w-6" />
                Payment Details
              </CardTitle>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Selected Plan: {selectedPlan.name}</span>
                <span className="text-2xl font-bold text-white">₹{selectedPlan.price.toLocaleString()}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <Label className="text-white text-lg mb-4 block">Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    className={`p-4 h-auto ${paymentMethod === "card" ? "bg-purple-500" : "border-white/20 text-white hover:bg-white/10"}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Credit/Debit Card
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === "upi" ? "default" : "outline"}
                    className={`p-4 h-auto ${paymentMethod === "upi" ? "bg-purple-500" : "border-white/20 text-white hover:bg-white/10"}`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    UPI
                  </Button>
                </div>
              </div>

              <Separator className="bg-white/20" />

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {paymentMethod === "card" ? (
                  <>
                    <div>
                      <Label htmlFor="cardholderName" className="text-white">
                        Cardholder Name
                      </Label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber" className="text-white">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-white">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-white">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <Label htmlFor="upiId" className="text-white">
                      UPI ID
                    </Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="yourname@upi"
                    />
                  </div>
                )}

                <div className="space-y-4 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-3"
                  >
                    Pay ₹{selectedPlan.price.toLocaleString()}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleRazorpayPayment}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-lg py-3"
                  >
                    Pay with Razorpay
                  </Button>
                </div>
              </form>

              <div className="text-center text-sm text-gray-400">
                <Shield className="inline h-4 w-4 mr-1" />
                Your payment information is secure and encrypted
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

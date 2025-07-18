import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { verifyPassword, generateToken } from "@/lib/auth"
import type { User } from "@/lib/models/User"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = loginSchema.parse(body)

    const db = await getDatabase()
    const usersCollection = db.collection<User>("users")

    // Find user by email
    const user = await usersCollection.findOne({
      email: validatedData.email.toLowerCase(),
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(validatedData.password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id!.toString(),
      email: user.email,
    })

    // Return user data (without password)
    const userResponse = {
      id: user._id!.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      plan: user.plan,
      planExpiresAt: user.planExpiresAt,
      profileImage: user.profileImage,
      stats: user.stats,
      preferences: user.preferences,
    }

    return NextResponse.json({
      user: userResponse,
      token,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

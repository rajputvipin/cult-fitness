import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { hashPassword, generateToken } from "@/lib/auth"
import type { User } from "@/lib/models/User"
import { z } from "zod"

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = signupSchema.parse(body)

    const db = await getDatabase()
    const usersCollection = db.collection<User>("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      email: validatedData.email.toLowerCase(),
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    // Create user
    const newUser: Omit<User, "_id"> = {
      email: validatedData.email.toLowerCase(),
      password: hashedPassword,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phone: validatedData.phone,
      plan: "Free",
      preferences: {
        workoutTime: "morning",
        workoutDuration: 60,
        fitnessLevel: "beginner",
        notifications: {
          workoutReminders: true,
          nutritionTips: true,
          progressUpdates: true,
        },
      },
      stats: {
        totalWorkouts: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalCaloriesBurned: 0,
        joinDate: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await usersCollection.insertOne(newUser)

    // Generate JWT token
    const token = generateToken({
      userId: result.insertedId.toString(),
      email: validatedData.email.toLowerCase(),
    })

    // Return user data (without password)
    const userResponse = {
      id: result.insertedId.toString(),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      plan: newUser.plan,
      stats: newUser.stats,
    }

    return NextResponse.json(
      {
        user: userResponse,
        token,
        message: "Account created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

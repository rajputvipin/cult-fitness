import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { getDatabase } from "../config/database"
import { createError } from "../middleware/errorHandler"
import type { User } from "../models/User"

const router = express.Router()

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

// Signup
router.post("/signup", async (req, res, next) => {
  try {
    const validatedData = signupSchema.parse(req.body)
    const db = getDatabase()
    const usersCollection = db.collection<User>("users")

    // Check if user exists
    const existingUser = await usersCollection.findOne({
      email: validatedData.email.toLowerCase(),
    })

    if (existingUser) {
      throw createError("User with this email already exists", 400)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

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

    // Generate JWT
    const token = jwt.sign(
      {
        userId: result.insertedId.toString(),
        email: validatedData.email.toLowerCase(),
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    // Return user data (without password)
    const userResponse = {
      id: result.insertedId.toString(),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      plan: newUser.plan,
      stats: newUser.stats,
      preferences: newUser.preferences,
    }

    res.status(201).json({
      user: userResponse,
      token,
      message: "Account created successfully",
    })
  } catch (error) {
    next(error)
  }
})

// Login
router.post("/login", async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body)
    const db = getDatabase()
    const usersCollection = db.collection<User>("users")

    // Find user
    const user = await usersCollection.findOne({
      email: validatedData.email.toLowerCase(),
    })

    if (!user) {
      throw createError("Invalid email or password", 401)
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password)

    if (!isPasswordValid) {
      throw createError("Invalid email or password", 401)
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id!.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

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

    res.json({
      user: userResponse,
      token,
      message: "Login successful",
    })
  } catch (error) {
    next(error)
  }
})

export default router

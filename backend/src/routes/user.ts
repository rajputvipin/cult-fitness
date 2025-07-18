import express from "express"
import { ObjectId } from "mongodb"
import { getDatabase } from "../config/database"
import { authenticateToken, type AuthRequest } from "../middleware/auth"
import { createError } from "../middleware/errorHandler"
import type { User } from "../models/User"


const router = express.Router()

// Get current user
router.get("/me", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const db = getDatabase()
    const usersCollection = db.collection<User>("users")

    const user = await usersCollection.findOne({
      _id: new ObjectId(req.user!.userId),
    })

    if (!user) {
      throw createError("User not found", 404)
    }

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
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      fitnessGoals: user.fitnessGoals,
      medicalConditions: user.medicalConditions,
      emergencyContact: user.emergencyContact,
      stats: user.stats,
      preferences: user.preferences,
    }

    res.json({ user: userResponse })
  } catch (error) {
    next(error)
  }
})

// Get current user dashboard (same as /me)
router.get("/dashboard", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const db = getDatabase()
    const usersCollection = db.collection<User>("users")

    const user = await usersCollection.findOne({
      _id: new ObjectId(req.user!.userId),
    })

    if (!user) {
      throw createError("User not found", 404)
    }

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
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      fitnessGoals: user.fitnessGoals,
      medicalConditions: user.medicalConditions,
      emergencyContact: user.emergencyContact,
      stats: user.stats,
      preferences: user.preferences,
    }

    res.json({ user: userResponse })
  } catch (error) {
    next(error)
  }
})

// Update user profile
router.put("/me", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const db = getDatabase()
    const usersCollection = db.collection<User>("users")

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.user!.userId) },
      {
        $set: {
          ...req.body,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      throw createError("User not found", 404)
    }

    // Get updated user
    const updatedUser = await usersCollection.findOne({
      _id: new ObjectId(req.user!.userId),
    })

    const userResponse = {
      id: updatedUser!._id!.toString(),
      email: updatedUser!.email,
      firstName: updatedUser!.firstName,
      lastName: updatedUser!.lastName,
      phone: updatedUser!.phone,
      plan: updatedUser!.plan,
      planExpiresAt: updatedUser!.planExpiresAt,
      profileImage: updatedUser!.profileImage,
      dateOfBirth: updatedUser!.dateOfBirth,
      gender: updatedUser!.gender,
      height: updatedUser!.height,
      weight: updatedUser!.weight,
      fitnessGoals: updatedUser!.fitnessGoals,
      medicalConditions: updatedUser!.medicalConditions,
      emergencyContact: updatedUser!.emergencyContact,
      stats: updatedUser!.stats,
      preferences: updatedUser!.preferences,
    }

    res.json({
      user: userResponse,
      message: "Profile updated successfully",
    })
  } catch (error) {
    next(error)
  }
})

export default router

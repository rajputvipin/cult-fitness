import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getAuthUser } from "@/lib/auth"
import type { User } from "@/lib/models/User"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const authUser = await getAuthUser(request)

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const usersCollection = db.collection<User>("users")

    // Find user by ID
    const user = await usersCollection.findOne({
      _id: new ObjectId(authUser.userId),
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
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

    return NextResponse.json({ user: userResponse })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get authenticated user
    const authUser = await getAuthUser(request)

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const db = await getDatabase()
    const usersCollection = db.collection<User>("users")

    // Update user
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(authUser.userId) },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get updated user
    const updatedUser = await usersCollection.findOne({
      _id: new ObjectId(authUser.userId),
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

    return NextResponse.json({
      user: userResponse,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

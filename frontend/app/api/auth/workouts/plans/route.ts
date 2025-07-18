import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getAuthUser } from "@/lib/auth"
import type { WorkoutPlan } from "@/lib/models/Workout"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request)

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const workoutPlansCollection = db.collection<WorkoutPlan>("workoutPlans")

    // Get workout plans for the user
    const workoutPlans = await workoutPlansCollection
      .find({
        $or: [{ userId: new ObjectId(authUser.userId) }, { createdBy: "system", isActive: true }],
      })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ workoutPlans })
  } catch (error) {
    console.error("Get workout plans error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request)

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const db = await getDatabase()
    const workoutPlansCollection = db.collection<WorkoutPlan>("workoutPlans")

    const newWorkoutPlan: Omit<WorkoutPlan, "_id"> = {
      userId: new ObjectId(authUser.userId),
      name: body.name,
      description: body.description,
      difficulty: body.difficulty,
      duration: body.duration,
      targetMuscles: body.targetMuscles,
      exercises: body.exercises,
      caloriesBurnedEstimate: body.caloriesBurnedEstimate,
      createdBy: "system",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await workoutPlansCollection.insertOne(newWorkoutPlan)

    return NextResponse.json(
      {
        workoutPlan: { ...newWorkoutPlan, _id: result.insertedId },
        message: "Workout plan created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create workout plan error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

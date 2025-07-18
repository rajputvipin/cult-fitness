import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getAuthUser } from "@/lib/auth"
import type { WeeklyPlan } from "@/lib/models/Workout"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request)

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const weekStart = searchParams.get("weekStart")

    if (!weekStart) {
      return NextResponse.json({ error: "Week start date is required" }, { status: 400 })
    }

    const db = await getDatabase()
    const weeklyPlansCollection = db.collection<WeeklyPlan>("weeklyPlans")

    const weekStartDate = new Date(weekStart)
    const weekEndDate = new Date(weekStartDate)
    weekEndDate.setDate(weekEndDate.getDate() + 6)

    // Get weekly plan for the user
    const weeklyPlan = await weeklyPlansCollection.findOne({
      userId: new ObjectId(authUser.userId),
      weekStartDate: { $gte: weekStartDate, $lt: weekEndDate },
    })

    if (!weeklyPlan) {
      // Create default weekly plan
      const defaultWeeklyPlan: Omit<WeeklyPlan, "_id"> = {
        userId: new ObjectId(authUser.userId),
        weekStartDate,
        weekEndDate,
        plan: [
          { day: "monday", workoutPlanId: undefined, isRestDay: false, completed: false },
          { day: "tuesday", workoutPlanId: undefined, isRestDay: false, completed: false },
          { day: "wednesday", workoutPlanId: undefined, isRestDay: false, completed: false },
          { day: "thursday", workoutPlanId: undefined, isRestDay: false, completed: false },
          { day: "friday", workoutPlanId: undefined, isRestDay: false, completed: false },
          { day: "saturday", workoutPlanId: undefined, isRestDay: false, completed: false },
          { day: "sunday", workoutPlanId: undefined, isRestDay: true, completed: false },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await weeklyPlansCollection.insertOne(defaultWeeklyPlan)

      return NextResponse.json({
        weeklyPlan: { ...defaultWeeklyPlan, _id: result.insertedId },
      })
    }

    return NextResponse.json({ weeklyPlan })
  } catch (error) {
    console.error("Get weekly plan error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request)

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const db = await getDatabase()
    const weeklyPlansCollection = db.collection<WeeklyPlan>("weeklyPlans")

    const result = await weeklyPlansCollection.updateOne(
      {
        userId: new ObjectId(authUser.userId),
        _id: new ObjectId(body.weeklyPlanId),
      },
      {
        $set: {
          plan: body.plan,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Weekly plan not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Weekly plan updated successfully",
    })
  } catch (error) {
    console.error("Update weekly plan error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

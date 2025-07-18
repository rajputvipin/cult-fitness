import express from "express"
import { ObjectId } from "mongodb"
import { getDatabase } from "../config/database"
import { authenticateToken, type AuthRequest } from "../middleware/auth"
import { createError } from "../middleware/errorHandler"
import type { WorkoutPlan, WeeklyPlan } from "../models/Workout"

const router = express.Router()

// Get workout plans
router.get("/plans", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const db = getDatabase()
    const workoutPlansCollection = db.collection<WorkoutPlan>("workoutPlans")

    const workoutPlans = await workoutPlansCollection
      .find({
        $or: [{ userId: new ObjectId(req.user!.userId) }, { createdBy: "system", isActive: true }],
      })
      .sort({ createdAt: -1 })
      .toArray()

    res.json({ workoutPlans })
  } catch (error) {
    next(error)
  }
})

// Create workout plan
router.post("/plans", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const db = getDatabase()
    const workoutPlansCollection = db.collection<WorkoutPlan>("workoutPlans")

    const newWorkoutPlan: Omit<WorkoutPlan, "_id"> = {
      userId: new ObjectId(req.user!.userId),
      name: req.body.name,
      description: req.body.description,
      difficulty: req.body.difficulty,
      duration: req.body.duration,
      targetMuscles: req.body.targetMuscles,
      exercises: req.body.exercises,
      caloriesBurnedEstimate: req.body.caloriesBurnedEstimate,
      createdBy: "system",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await workoutPlansCollection.insertOne(newWorkoutPlan)

    res.status(201).json({
      workoutPlan: { ...newWorkoutPlan, _id: result.insertedId },
      message: "Workout plan created successfully",
    })
  } catch (error) {
    next(error)
  }
})

// Get weekly plan
router.get("/weekly-plan", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { weekStart } = req.query

    if (!weekStart) {
      throw createError("Week start date is required", 400)
    }

    const db = getDatabase()
    const weeklyPlansCollection = db.collection<WeeklyPlan>("weeklyPlans")

    const weekStartDate = new Date(weekStart as string)
    const weekEndDate = new Date(weekStartDate)
    weekEndDate.setDate(weekEndDate.getDate() + 6)

    let weeklyPlan = await weeklyPlansCollection.findOne({
      userId: new ObjectId(req.user!.userId),
      weekStartDate: { $gte: weekStartDate, $lt: weekEndDate },
    })

    if (!weeklyPlan) {
      // Create default weekly plan
      const defaultWeeklyPlan: Omit<WeeklyPlan, "_id"> = {
        userId: new ObjectId(req.user!.userId),
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
      weeklyPlan = { ...defaultWeeklyPlan, _id: result.insertedId }
    }

    res.json({ weeklyPlan })
  } catch (error) {
    next(error)
  }
})

// Update weekly plan
router.put("/weekly-plan", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const db = getDatabase()
    const weeklyPlansCollection = db.collection<WeeklyPlan>("weeklyPlans")

    const result = await weeklyPlansCollection.updateOne(
      {
        userId: new ObjectId(req.user!.userId),
        _id: new ObjectId(req.body.weeklyPlanId),
      },
      {
        $set: {
          plan: req.body.plan,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      throw createError("Weekly plan not found", 404)
    }

    res.json({
      message: "Weekly plan updated successfully",
    })
  } catch (error) {
    next(error)
  }
})

export default router

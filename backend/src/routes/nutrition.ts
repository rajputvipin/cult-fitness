import express from "express"
import { ObjectId } from "mongodb"
import { getDatabase } from "../config/database"
import { authenticateToken, type AuthRequest } from "../middleware/auth"
import type { NutritionPlan, FoodLog } from "../models/Nutrition"

const router = express.Router()

// Get nutrition plans
router.get("/plans", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const db = getDatabase()
    const nutritionPlansCollection = db.collection<NutritionPlan>("nutritionPlans")

    const nutritionPlans = await nutritionPlansCollection
      .find({
        $or: [{ userId: new ObjectId(req.user!.userId) }, { createdBy: "system", isActive: true }],
      })
      .sort({ createdAt: -1 })
      .toArray()

    res.json({ nutritionPlans })
  } catch (error) {
    next(error)
  }
})

// Get food log
router.get("/food-log", authenticateToken, async (req: AuthRequest, res, next) => {
  try {
    const { date } = req.query
    const db = getDatabase()
    const foodLogsCollection = db.collection<FoodLog>("foodLogs")

    const targetDate = date ? new Date(date as string) : new Date()
    targetDate.setHours(0, 0, 0, 0)

    const nextDay = new Date(targetDate)
    nextDay.setDate(nextDay.getDate() + 1)

    const foodLog = await foodLogsCollection.findOne({
      userId: new ObjectId(req.user!.userId),
      date: { $gte: targetDate, $lt: nextDay },
    })

    res.json({ foodLog })
  } catch (error) {
    next(error)
  }
})

export default router

import type { ObjectId } from "mongodb"

export interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: number // in kg
  duration?: number // in seconds
  restTime: number // in seconds
  instructions: string[]
  targetMuscles: string[]
  equipment?: string[]
  videoUrl?: string
  imageUrl?: string
}

export interface WorkoutPlan {
  _id?: ObjectId
  userId: ObjectId
  name: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // in minutes
  targetMuscles: string[]
  exercises: Exercise[]
  caloriesBurnedEstimate: number
  createdBy: "system" | "trainer"
  trainerId?: ObjectId
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WeeklyPlan {
  _id?: ObjectId
  userId: ObjectId
  weekStartDate: Date
  weekEndDate: Date
  plan: {
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
    workoutPlanId?: ObjectId
    isRestDay: boolean
    completed: boolean
  }[]
  createdAt: Date
  updatedAt: Date
}

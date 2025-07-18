import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  plan: "Free" | "Basic" | "Premium" | "Elite"
  planExpiresAt?: Date
  profileImage?: string
  dateOfBirth?: Date
  gender?: "male" | "female" | "other"
  height?: number // in cm
  weight?: number // in kg
  fitnessGoals?: string[]
  medicalConditions?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  preferences?: {
    workoutTime: "morning" | "afternoon" | "evening"
    workoutDuration: number // in minutes
    fitnessLevel: "beginner" | "intermediate" | "advanced"
    notifications: {
      workoutReminders: boolean
      nutritionTips: boolean
      progressUpdates: boolean
    }
  }
  stats?: {
    totalWorkouts: number
    currentStreak: number
    longestStreak: number
    totalCaloriesBurned: number
    joinDate: Date
    lastWorkout?: Date
  }
  createdAt: Date
  updatedAt: Date
}

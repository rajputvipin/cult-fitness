// src/types/user.ts

export interface User {
  _id?: string
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

export interface CreateUserData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export interface UpdateUserData {
  firstName?: string
  lastName?: string
  phone?: string
  profileImage?: string
  dateOfBirth?: Date
  gender?: "male" | "female" | "other"
  height?: number
  weight?: number
  fitnessGoals?: string[]
  medicalConditions?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  preferences?: {
    workoutTime: "morning" | "afternoon" | "evening"
    workoutDuration: number
    fitnessLevel: "beginner" | "intermediate" | "advanced"
    notifications: {
      workoutReminders: boolean
      nutritionTips: boolean
      progressUpdates: boolean
    }
  }
}

// src/types/workout.ts (or a similar location in your frontend project)

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
  _id?: string
  userId: string
  name: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // in minutes
  targetMuscles: string[]
  exercises: Exercise[]
  caloriesBurnedEstimate: number
  createdBy: "system" | "trainer"
  trainerId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WorkoutSession {
  _id?: string
  userId: string
  workoutPlanId: string
  date: Date
  startTime: Date
  endTime?: Date
  status: "planned" | "in-progress" | "completed" | "skipped"
  exercises: {
    exerciseIndex: number
    sets: {
      setNumber: number
      reps: number
      weight?: number
      duration?: number
      completed: boolean
      restTime?: number
    }[]
    completed: boolean
    notes?: string
  }[]
  totalCaloriesBurned?: number
  notes?: string
  rating?: number // 1-5 stars
  createdAt: Date
  updatedAt: Date
}

export interface WeeklyPlan {
  _id?: string
  userId: string
  weekStartDate: Date
  weekEndDate: Date
  plan: {
    day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
    workoutPlanId?: string
    isRestDay: boolean
    completed: boolean
  }[]
  createdAt: Date
  updatedAt: Date
}

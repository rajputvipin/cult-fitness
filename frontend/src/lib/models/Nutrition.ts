// src/types/nutrition.ts (or wherever you store your frontend types)

export interface NutritionPlan {
  _id?: string
  userId: string
  name: string
  description: string
  goal: "weight-loss" | "muscle-gain" | "maintenance" | "endurance"
  dailyCalories: number
  macros: {
    protein: number // in grams
    carbs: number // in grams
    fat: number // in grams
  }
  meals: {
    type: "breakfast" | "lunch" | "dinner" | "snack"
    name: string
    description: string
    calories: number
    macros: {
      protein: number
      carbs: number
      fat: number
    }
    ingredients: {
      name: string
      quantity: number
      unit: string
      calories: number
    }[]
    instructions: string[]
    prepTime: number // in minutes
    imageUrl?: string
  }[]
  isActive: boolean
  createdBy: "system" | "nutritionist"
  nutritionistId?: string
  createdAt: Date
  updatedAt: Date
}

export interface FoodLog {
  _id?: string
  userId: string
  date: Date
  meals: {
    type: "breakfast" | "lunch" | "dinner" | "snack"
    foods: {
      name: string
      quantity: number
      unit: string
      calories: number
      macros: {
        protein: number
        carbs: number
        fat: number
      }
    }[]
    totalCalories: number
  }[]
  totalCalories: number
  totalMacros: {
    protein: number
    carbs: number
    fat: number
  }
  waterIntake: number // in ml
  notes?: string
  createdAt: Date
  updatedAt: Date
}

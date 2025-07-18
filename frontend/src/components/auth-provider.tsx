"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { authAPI } from "@/lib/api"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  plan: string
  planExpiresAt?: string
  profileImage?: string
  stats?: {
    totalWorkouts: number
    currentStreak: number
    longestStreak: number
    totalCaloriesBurned: number
    joinDate: string
    lastWorkout?: string
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

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, userData: any) => Promise<void>
  logout: () => void
  loading: boolean
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedToken = localStorage.getItem("cult-fitness-token")
    if (savedToken) {
      setToken(savedToken)
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await authAPI.getCurrentUser()
      setUser(response.data.user)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      localStorage.removeItem("cult-fitness-token")
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password })
      const { user: userData, token: authToken } = response.data

      setUser(userData)
      setToken(authToken)
      localStorage.setItem("cult-fitness-token", authToken)
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login failed")
    }
  }

  const signup = async (email: string, password: string, userData: any) => {
    try {
      const response = await authAPI.signup({
        email,
        password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      })

      const { user: newUser, token: authToken } = response.data

      setUser(newUser)
      setToken(authToken)
      localStorage.setItem("cult-fitness-token", authToken)
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Signup failed")
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(userData)
      setUser(response.data.user)
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Update failed")
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("cult-fitness-token")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }

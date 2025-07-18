import axios from "axios";

const API_BASE_URL = process.env.VITE_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cult-fitness-token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("cult-fitness-token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api

// API functions
export const authAPI = {
  signup: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
  }) => api.post("/auth/signup", data),

  login: (data: { email: string; password: string }) => api.post("/auth/login", data),

  getCurrentUser: () => api.get("/user/me"),

  updateProfile: (data: any) => api.put("/user/me", data),
}

export const workoutAPI = {
  getWorkoutPlans: () => api.get("/workouts/plans"),

  createWorkoutPlan: (data: any) => api.post("/workouts/plans", data),

  getWeeklyPlan: (weekStart: string) => api.get(`/workouts/weekly-plan?weekStart=${weekStart}`),

  updateWeeklyPlan: (data: any) => api.put("/workouts/weekly-plan", data),
}

export const nutritionAPI = {
  getNutritionPlans: () => api.get("/nutrition/plans"),

  getFoodLog: (date?: string) => api.get(`/nutrition/food-log${date ? `?date=${date}` : ""}`),
}

export const paymentAPI = {
  createOrder: (data: { planType: string }) => api.post("/payments/create-order", data),

  verifyPayment: (data: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }) => api.post("/payments/verify", data),
}

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectToDatabase } from "./config/database"
import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"
import workoutRoutes from "./routes/workout"
import nutritionRoutes from "./routes/nutrition"
import paymentRoutes from "./routes/payment"
import { errorHandler } from "./middleware/errorHandler"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(morgan("combined"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/workouts", workoutRoutes)
app.use("/api/nutrition", nutritionRoutes)
app.use("/api/payments", paymentRoutes)

// Error handling
app.use(errorHandler)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Start server
async function startServer() {
  try {
    await connectToDatabase()
    console.log("Connected to MongoDB")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()

export default app

import { MongoClient, type Db } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI environment variable is required")
}

const uri = process.env.MONGODB_URI

let client: MongoClient
let db: Db

// For development: use global to prevent multiple DB connections during hot reloads
declare global {
  var _mongoClient: MongoClient | undefined
  var _mongoDb: Db | undefined
}

// Main function to connect to MongoDB
export async function connectToDatabase(): Promise<Db> {
  if (process.env.NODE_ENV === "development") {
    if (global._mongoClient && global._mongoDb) {
      return global._mongoDb
    }
  } else {
    if (db) return db
  }

  try {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db("cult-fitness")

    // Store in global for development to reuse on reload
    if (process.env.NODE_ENV === "development") {
      global._mongoClient = client
      global._mongoDb = db
    }

    await createIndexes()
    console.log("✅ Connected to MongoDB")
    return db
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    throw error
  }
}

// Ensure required indexes exist
async function createIndexes() {
  try {
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ phone: 1 })

    await db.collection("workoutPlans").createIndex({ userId: 1 })
    await db.collection("workoutPlans").createIndex({ createdBy: 1, isActive: 1 })

    await db.collection("weeklyPlans").createIndex({ userId: 1, weekStartDate: 1 })

    await db.collection("payments").createIndex({ userId: 1 })
    await db.collection("payments").createIndex({ transactionId: 1 }, { unique: true })

    await db.collection("subscriptions").createIndex({ userId: 1 })
    await db.collection("subscriptions").createIndex({ status: 1, endDate: 1 })

    console.log("✅ Indexes created")
  } catch (error) {
    console.error("❌ Failed to create indexes:", error)
  }
}

// Getter for db after connected
export function getDatabase(): Db {
  if (!db) {
    throw new Error("❌ Database not connected. Call connectToDatabase() first.")
  }
  return db
}

// Close DB connection (optional for cleanup)
export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close()
    console.log("✅ MongoDB connection closed")
  }
}

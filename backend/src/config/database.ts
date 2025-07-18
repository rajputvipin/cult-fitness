import { MongoClient, type Db } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is required")
}

const uri = process.env.MONGODB_URI
let client: MongoClient
let db: Db

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db
  }

  try {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db("cult-fitness")

    // Create indexes
    await createIndexes()

    return db
  } catch (error) {
    console.error("Database connection failed:", error)
    throw error
  }
}

async function createIndexes() {
  try {
    // Users collection indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ phone: 1 })

    // Workout plans indexes
    await db.collection("workoutPlans").createIndex({ userId: 1 })
    await db.collection("workoutPlans").createIndex({ createdBy: 1, isActive: 1 })

    // Weekly plans indexes
    await db.collection("weeklyPlans").createIndex({ userId: 1, weekStartDate: 1 })

    // Payments indexes
    await db.collection("payments").createIndex({ userId: 1 })
    await db.collection("payments").createIndex({ transactionId: 1 }, { unique: true })

    // Subscriptions indexes
    await db.collection("subscriptions").createIndex({ userId: 1 })
    await db.collection("subscriptions").createIndex({ status: 1, endDate: 1 })

    console.log("Database indexes created successfully")
  } catch (error) {
    console.error("Failed to create indexes:", error)
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error("Database not connected")
  }
  return db
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close()
  }
}

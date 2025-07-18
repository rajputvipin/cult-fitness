import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined in environment variables.");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await client.close();
  }
}

testConnection();

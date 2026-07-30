import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file if not already set
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

let isConnected = false;

// Listen for disconnect so next call will reconnect
mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", () => {
  isConnected = false;
});

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10s — fail fast if Atlas is unreachable
      connectTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    isConnected = true;
    console.log("✓ MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    isConnected = false;
    console.error("✗ MongoDB connection failed:", error);
    throw error;
  }
}

export function disconnectDB() {
  return mongoose.disconnect();
}

export default mongoose;

import mongoose from "mongoose";
import { envConfig } from "./env-config";

export const connectDB = async (retries = 5): Promise<void> => {
  try {
    if (!envConfig.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(envConfig.MONGO_URI, {
      dbName: envConfig.DB_NAME || "inv-db",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    if (retries > 0) {
      const delay = (6 - retries) * 1000; // incremental backoff
      console.warn(
        `MongoDB connection failed. Retrying in ${delay / 1000}s... (${retries} attempts left)`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return connectDB(retries - 1);
    }
    if (error instanceof Error) {
      console.error("Failed to connect to MongoDB:", error.message);
    } else {
      console.error("Unknown error occurred while connecting to MongoDB");
    }
    process.exit(1);
  }
};
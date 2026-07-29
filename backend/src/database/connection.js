import mongoose from "mongoose";
import { env } from "../config/env.service.js";
export const databaseConnection = async () => {
  try {
    await mongoose.connect(env.database_url);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
  }
};

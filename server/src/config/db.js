import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables.");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    // eslint-disable-next-line no-console
    console.log("[db] MongoDB connected");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[db] MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

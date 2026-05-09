import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in environment variables.");
    }
    await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log("[db] MongoDB connected");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[db] MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

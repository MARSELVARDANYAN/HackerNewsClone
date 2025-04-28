import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://marseli93:marsel123456@cluster0.5h0bkhl.mongodb.net/Hacker?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;

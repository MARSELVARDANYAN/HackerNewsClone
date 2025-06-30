import express from "express";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import comentsRoutes from "./routes/commentsRoutes.js";
import askRoutes from "./routes/askAndAnswerRoutes.js";
import showPostRouter from "./routes/showPostRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import authRoutes from "./routes/authUserRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", askRoutes);
app.use("/", postRoutes);
app.use("/", comentsRoutes);
app.use("/", showPostRouter);
app.use("/", jobsRoutes);
app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("\n⛔ SIGINT received. Closing server...");
      await mongoose.connection.close();
      console.log("✅ MongoDB connection closed");
      server.close(() => {
        console.log("🛑 Server shut down");
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

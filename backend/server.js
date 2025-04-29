import express from "express";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import comentsRoutes from "./routes/commentsRoutes.js";
import askRoutes from "./routes/askAndAnswerRoutes.js";
import showPostRouter from "./routes/showPostRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import authRoutes from "./routes/authUserRoutes.js";


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

const PORT = process.env.PORT || 3000;
app.use("/", askRoutes);
app.use("/", postRoutes);
app.use("/", comentsRoutes);
app.use("/", showPostRouter);
app.use("/", jobsRoutes);
app.use("/", authRoutes);


app.listen(PORT, () => {
  console.log("server is running");
});

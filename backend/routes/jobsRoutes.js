import express from "express";
import ShowPage from "../models/ShowPage.js";

const jobsRoutes = express.Router();

jobsRoutes.get("/job", async (req, res) => {
  try {
    const jobs = await ShowPage.find({ type: "job" }).sort({ createdAt: -1 });
    console.log(jobs);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

jobsRoutes.get("/job/:id", async (req, res) => {
  try {
    const job = await ShowPage.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job" });
  }
});


export default jobsRoutes;

import express from "express";
import ShowPage from "../models/ShowPage.js";

const showPostRoutes = express.Router();

showPostRoutes.post("/createShow", async (req, res) => {
  try {
    const { title, url, content, type, authorId } = req.body;

    if (!title || !authorId) {
      return res
        .status(400)
        .json({ message: "Title and authorId are required" });
    }

    const post = new ShowPage({ title, url, content, type, authorId });

    await post.save();
    console.log("Saved post:", post);

    res.status(201).json(post);
  } catch (err) {
    console.error("Error saving post:", err);
    res
      .status(400)
      .json({ message: "Failed to create post", error: err.message });
  }
});

showPostRoutes.get("/show", async (req, res) => {
  try {
    const posts = await ShowPage.find()
      .populate("authorId", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Show posts" });
  }
});

showPostRoutes.get("/show/:id", async (req, res) => {
  try {
    const post = await ShowPage.findById(req.params.id).populate(
      "authorId",
      "username"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post" });
  }
});

export default showPostRoutes;

import express from "express";
import Post from "../models/Posts.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js"; 

const postRoutes = express.Router();

postRoutes.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
});

postRoutes.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
});

postRoutes.get("/posts/past", async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ message: "The 'date' parameter is required" });
  }

  const targetDate = new Date(date);
  if (isNaN(targetDate)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  try {
    const posts = await Post.find({
      createdAt: { $lt: targetDate },
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Error receiving questions:", error);
    res.status(500).json({ message: "Error receiving questions" });
  }
});

postRoutes.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
}
);

postRoutes.post("/submit", authMiddleware, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = new Post({
    title: title,
    content: content,
    authorId: req.user._id,
  });

  newPost
    .save()
    .then(() => res.status(201).json({ message: "Post created successfully" }))
    .catch((error) =>
      res.status(500).json({ message: "Error creating post", error })
    );
  console.log("Received data:", req.body.content);
});

export default postRoutes;

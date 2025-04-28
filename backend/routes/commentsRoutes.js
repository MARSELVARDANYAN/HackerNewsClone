import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Comments from "../models/Comments.js";

const commentsRoutes = express.Router();

commentsRoutes.post("/comments", authMiddleware, async (req, res) => {
  const { content, postId, parentId } = req.body;

  if (!content || !postId) {
    return res.status(400).json({ message: "Content и postId обязательны" });
  }

  try {
    const newComment = new Comments({
      content: content,
      postId: postId,
      parentId: parentId || null,
      authorId: req.user._id,
    });

    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment successfully created", newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating comment", error });
  }
});

commentsRoutes.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comments.find({ postId })
      .populate("authorId", "username")
      .populate("parentId")
      .sort({ createdAt: 1 });

    console.log("Comments found:", comments); 
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error receiving comments", error });
  }
});

commentsRoutes.get("/all-comments", async (req, res) => {
  try {
    const comments = await Comments.find()
      .populate("authorId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving all comments" });
  }
});


export default commentsRoutes;

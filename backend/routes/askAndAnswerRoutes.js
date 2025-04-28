import express from "express";
import Question from "../models/Question.js";
import CommentsQuestion from "../models/CommentsQuestion.js";

const askRoutes = express.Router();

askRoutes.get("/ask", async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("authorId", "username") 
      .populate("recipientId", "username") 
      .sort({ createdAt: -1 }); 

    res.json(questions);
  } catch (error) {
    console.error("Error receiving questions:", error);
    res.status(500).json({ message: "Error receiving questions" });
  }
});

askRoutes.post("/ask", (req, res) => {
  const { title, content, authorId, recipientId, isAnonymous, isPrivate } =
    req.body;

  if (!title || !content || !authorId) {
    return res.status(400).send("Title, content, and userId are required");
  }

  const question = new Question({
    title,
    content,
    authorId,
    recipientId: isPrivate ? recipientId : null,
    isAnonymous,
    isPrivate,
  });

  question
    .save()
    .then((savedQuestion) => {
      res.status(200).json(savedQuestion);
    })
    .catch((error) => {
      console.error("Error saving question:", error);
      res.status(500).send("Internal Server Error");
    });
});

askRoutes.get("/quesComments/:questionId", async (req, res) => {
  const { questionId } = req.params;

  try {
    const comments = await CommentsQuestion.find({ questionId });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Failed to fetch comments", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

askRoutes.post("/quesComments", async (req, res) => {
  const { content, authorId, questionId } = req.body;

  if (!content || !authorId || !questionId) {
    return res
      .status(400)
      .send("Content, authorId, and questionId are required");
  }

  const comment = new CommentsQuestion({
    content,
    authorId,
    questionId,
    parentId: req.body.parentId || null,
  });

  try {
    const savedComment = await comment.save();
    console.log("Comment saved:", savedComment);
    res.status(200).json(savedComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default askRoutes;

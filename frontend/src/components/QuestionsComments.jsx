import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getQuestionComments, postQuestionComments } from "../services/api";
import AnswerList from "../pages/AnswerList";
import generateToken from "../utils/decodeJWT";

const QuestionsComments = ({ questionId }) => {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      const response = await getQuestionComments(questionId);
      const sorted = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sorted);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [questionId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const authorId = generateToken();

    const newComment = {
      content: commentContent,
      questionId,
      authorId,
    };

    try {
      await postQuestionComments(newComment);
      setCommentContent("");
      await loadComments();
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const handleReplySubmit = async (parentId, replyContent) => {
    const authId = generateToken();
    const replyComment = {
      content: replyContent,
      questionId,
      authorId: authId,
      parentId,
    };

    try {
      await postQuestionComments(replyComment);
      await loadComments();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
        p: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
        overflowWrap: "break-word",
        wordBreak: "break-word",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      <form onSubmit={handleCommentSubmit}>
        <TextField
          label="Add a comment"
          fullWidth
          multiline
          rows={4}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "#fff",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#ff6600",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ff6600",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#ff6600",
            "&:hover": {
              backgroundColor: "#ff6600",
              opacity: 0.8,
            },
          }}
        >
          Post a comment
        </Button>
      </form>

      <AnswerList
        comments={comments}
        questionId={questionId}
        setComments={setComments}
        handleReplySubmit={handleReplySubmit}
      />
    </Box>
  );
};

export default QuestionsComments;

import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { postComment, getComments } from "../services/api";
import CommentList from "./CommentList";

const CommentsSection = ({ postId }) => {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const response = await getComments(postId);
      const sorted = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sorted);
    };
    loadComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      content: commentContent,
      postId,
    };

    try {
      await postComment(newComment);
      setCommentContent("");
      const response = await getComments(postId);
      const sorted = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sorted);
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  return (
    <Container>
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
          style={{ marginBottom: "1rem" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ background: "#ff6600" }}
        >
          Post a comment
        </Button>
      </form>

      <CommentList comments={comments} postId={postId} />
    </Container>
  );
};

export default CommentsSection;

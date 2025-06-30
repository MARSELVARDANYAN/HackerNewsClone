import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, getComments, postComment } from "../services/api";
import { Typography, Container, TextField, Button } from "@mui/material";
import CommentList from "./CommentList";

const SinglePost = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getPostById(postId).then(setPost);
    getComments(postId).then(res => {
          console.log("COMMENTS:", res.data); 

      setComments(res.data)});
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    await postComment({ content: newComment, postId });
    setNewComment("");
    const response = await getComments(postId);
    setComments(response.data);
  };

  const handleReplySubmit = async (parentId, replyContent) => {
  if (!replyContent || !replyContent.trim()) return;
  await postComment({ content: replyContent, postId, parentId });
  getComments(postId).then((res) => setComments(res.data));
};


  if (!post) return <div>Loading...</div>;

  return (
    <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom>{post.title}</Typography>
      <Typography variant="body1" paragraph>{post.content}</Typography>

      <Typography variant="h6" gutterBottom>Comments</Typography>

      <CommentList
        comments={comments}
        postId={postId}
        setComments={setComments}
        handleReplySubmit={handleReplySubmit}
      />

      <TextField
        label="Add a comment"
        fullWidth
        multiline
        rows={3}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{ marginTop: "1rem" }}
      />
      <Button
        onClick={handleCommentSubmit}
        variant="contained"
        style={{ marginTop: "1rem", backgroundColor: "#ff6600" }}
      >
        Post Comment
      </Button>
    </Container>
  );
};

export default SinglePost;

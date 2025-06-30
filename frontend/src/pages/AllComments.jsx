import React, { useEffect, useState } from "react";
import { Typography, Paper, CircularProgress } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { fetchAllComments } from "../services/api";

const AllComments = () => {
    console.log("AllComments component rendered");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetchAllComments(); 
        setComments(res.data);
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        All Coments
      </Typography>
      {comments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
        .map((comment) => (
          <Paper
            key={comment._id}
            elevation={2}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              {comment.authorId?.username || "Anonymous"} —{" "}
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </Typography>
            <Typography variant="body1">{comment.content}</Typography>
          </Paper>
        ))}
    </div>
  );
};

export default AllComments;

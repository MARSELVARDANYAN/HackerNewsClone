import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
} from "@mui/material";
import { fetchPastPosts } from "../services/api";
import CommentSection from "../components/CommentsSection";

const PastPosts = () => {
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState("");
  const [visibleComments, setVisibleComments] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await fetchPastPosts(date);
      setPosts(res.data);
    } catch (error) {
      console.error("Error while retrieving posts:", error);
    }
  };

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Old posts
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <TextField
          label="old posts"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
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
              "& input": {
                color: "black", 
              },
              "&.Mui-focused input": {
                color: "black", 
              },
            },
            "& .MuiInputLabel-root": {
              color: "#666", 
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", 
            },
          }}
        />

        <Button
          variant="contained"
          style={{ backgroundColor: "#ff6600" }}
          onClick={fetchPosts}
        >
          Load posts
        </Button>
      </Stack>
      <Stack spacing={2}>
        {posts.map((post) => (
          <Card key={post._id} variant="outlined" sx={{ borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="h6">
                <Link
                  href={`/posts/${post._id}`}
                  underline="hover"
                  color="black"
                >
                  {post.title}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
              <Button
                style={{
                  backgroundColor: "#ff6600",
                  color: "white",
                  opacity: 0.9,
                }}
                variant="text"
                onClick={() => toggleComments(post._id)}
                sx={{ mt: 1 }}
              >
                {visibleComments[post._id] ? "Hide comments" : "Show comments"}
              </Button>
              {visibleComments[post._id] && (
                <CommentSection postId={post._id} />
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default PastPosts;

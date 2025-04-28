import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchPosts } from "../services/api";

const Newest = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" gutterBottom style={{ marginTop: "1rem" }}>
        Newest Posts
      </Typography>
      {posts.map((post, index) => (
        <Card
          key={post._id}
          style={{
            marginBottom: "0.4rem",
            border: "2px solid #ff6600",
            borderRadius: "6px",
          }}
        >
          <CardContent style={{ padding: "0.2rem" }}>
            <Typography variant="h6">
              {index + 1}. {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {post.content}
            </Typography>
            <Button
            type="button"
            variant="outlined"
            color="primary"
            style={{border:"1px solid #ff6600", color: "#ff6600"}}
              component={Link}
              to={`/post/${post._id}`}
              size="small"
            >
              View
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Newest;

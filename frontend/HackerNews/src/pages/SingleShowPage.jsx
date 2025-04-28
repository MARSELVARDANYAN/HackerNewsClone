import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowPageById } from "../services/api";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Link,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SingleShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getShowPageById(id);
        console.log("Fetched post data:", data.data);
        setPost(data.data);
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", padding: 4 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h3" component="h1" gutterBottom>
            {post.title}
          </Typography>
          {post.url && (
            <Typography variant="body1" gutterBottom>
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                color="warning"
              >
                {post.url}
              </Link>
            </Typography>
          )}
          {post.content && (
            <Typography variant="body1" paragraph>
              {post.content}
            </Typography>
          )}
          <Button
            type="button"
            variant="outlined"
            color="primary"
            style={{border:"1px solid #ff6600", color: "#ff6600"}}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleShowPage;

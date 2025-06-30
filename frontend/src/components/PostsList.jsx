import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

const PostList = ({ posts }) => {
  const isValidDate = (date) => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
  };

  return (
    <div>
      {posts.map((post) => {
        const formattedDate = isValidDate(post.createdAt)
          ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
          : "Unknown date";

        return (
          <div
            key={post._id}
            style={{
              margin: "0.5rem",
              padding: "5px",
              border: "2px solid #ff6600",
              borderRadius: "6px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {post.content}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              <strong>Author:</strong> {post.authorId?.username || "Unknown"}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Posted:</strong> {formattedDate}
            </Typography>

            <Link to={`/post/${post._id}`}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                style={{ border: "1px solid #ff6600", color: "#ff6600" }}
              >
                View Post
              </Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;

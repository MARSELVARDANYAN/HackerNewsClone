import React, { useEffect, useState } from "react";
import { getShowPosts } from "../services/api";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CreateShowPage from "./CreateSowPage"; 

const ShowPage = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePage, setShowCreatePage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getShowPosts();
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load show posts:", err);
      }
    };

    fetchData();
  }, []);

  const handleCreateClick = () => {
    setShowCreatePage(true);
    navigate("/createShow");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h7" gutterBottom>
        Plase read and show
      </Typography>

      <Button style={{backgroundColor: "#ff6600", color: "white", padding: "0.1em", margin: "0.2em"}} onClick={handleCreateClick}>Create</Button>
      {showCreatePage && <CreateShowPage />}

      {posts.map((post) => (
        <Card key={post._id} style={{ marginBottom: "1rem" }}>
          <CardContent style={{ padding: "0.4rem" }}>
            <Typography variant="h6" component="div">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              by {post.authorId?.username || "Anonymous"} •{" "}
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </Typography>
            <Button
              onClick={() => navigate(`/show/${post._id}`)}
              type="button"
            variant="outlined"
            color="primary"
            style={{border:"1px solid #ff6600", color: "#ff6600", marginTop: "0.5em", paddingTop: "0.1em", paddingBottom: "0.1em"}}
            >
              Read more
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShowPage;

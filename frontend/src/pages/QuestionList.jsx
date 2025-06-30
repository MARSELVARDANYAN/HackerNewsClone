import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
  Container,
} from "@mui/material";
import { getAsk } from "../services/api";
import { useNavigate } from "react-router-dom";
import QuestionsComments from "../components/QuestionsComments";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [visibleComments, setVisibleComments] = useState({});

  useEffect(() => {
    getAsk()
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const toggleComments = (questionId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Submitted Questions
      </Typography>

      <Button
        variant="contained"
        sx={{
          mb: 3,
          backgroundColor: "#ff6600",
          "&:hover": { backgroundColor: "#e65c00" },
          textTransform: "none",
          fontWeight: "bold",
        }}
        onClick={() => navigate("/ask")}
      >
        Ask a Question
      </Button>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          p: 3,
        }}
      >
        <List>
          {questions.map((q) => (
            <React.Fragment key={q._id}>
              <ListItem alignItems="flex-start" disableGutters>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#333", mb: 1 }}
                    >
                      {q.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary">
                        {q.isAnonymous
                          ? "Author: Anonymous"
                          : `Author: ${q.userId?.username || "Unknown"}`}
                      </Typography>
                      {q.recipientId && (
                        <Typography variant="body2" color="text.secondary">
                          Recipient: {q.recipientId.username}
                        </Typography>
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          whiteSpace: "pre-line",
                          wordBreak: "break-word",
                          color: "text.secondary",
                        }}
                      >
                        {q.content}
                      </Typography>
                      {q.tags && q.tags.length > 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.disabled",
                            display: "block",
                            mt: 1,
                          }}
                        >
                          Tags: {q.tags.join(", ")}
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>

              <Button
                variant="text"
                sx={{
                  mt: 1,
                  mb: 2,
                  color: "#ff6600",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => toggleComments(q._id)}
              >
                {visibleComments[q._id] ? "Hide comments" : "Show comments"}
              </Button>

              {visibleComments[q._id] && (
                <Box sx={{ mt: 2, width: "100%", overflow: "hidden" }}>
                  <QuestionsComments questionId={q._id} />
                </Box>
              )}
              <Divider sx={{ my: 2 }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default QuestionList;

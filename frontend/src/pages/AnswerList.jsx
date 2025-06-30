import React, { useState } from "react";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

const AnswerList = ({ comments, questionId, setComments, handleReplySubmit }) => {
  const [replyTextMap, setReplyTextMap] = useState({});
  const [replyVisibleMap, setReplyVisibleMap] = useState({});

  // Группировка комментариев по родителям
  const buildCommentTree = () => {
    const map = {};
    comments.forEach((comment) => {
      const parentId = comment.parentId ? comment.parentId.toString() : null;

      if (!map[parentId]) map[parentId] = [];
      map[parentId].push(comment);
    });
    return map;
  };

  const tree = buildCommentTree();

  const handleChange = (id, value) => {
    setReplyTextMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleReply = async (id) => {
    const content = replyTextMap[id];
    if (!content || !content.trim()) return;
    await handleReplySubmit(id, content);
    setReplyTextMap((prev) => ({ ...prev, [id]: "" }));
    setReplyVisibleMap((prev) => ({ ...prev, [id]: false }));
  };

  const toggleReplyField = (id) => {
    setReplyVisibleMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Рекурсивный рендер
  const renderComments = (parentId = null, depth = 0) => {
    const commentGroup = tree[parentId] || [];
    return commentGroup.map((comment) => (
      <div
        key={comment._id}
        style={{
          marginLeft: depth * 20,
          marginTop: "1rem",
          transition: "all 0.3s ease",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "1rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow:
              depth === 0
                ? "0 4px 10px rgba(0, 0, 0, 0.1)"
                : "0 2px 5px rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              depth === 0
                ? "0 4px 10px rgba(149, 6, 6, 0.1)"
                : "0 2px 5px rgba(0, 0, 0, 0.15)")
          }
        >
          <Typography variant="body1" style={{ marginBottom: "0.5rem" }}>
            {comment.content}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginBottom: "0.25rem" }}
          >
            {(
              <p>
                Author: <strong>{comment.authorId?.username}</strong>
              </p>
            ) || "Autor: Anonymous"}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </Typography>

          {/* Кнопка для открытия текстового поля */}
          <Button
            variant="contained"
            onClick={() => toggleReplyField(comment._id)}
            size="small"
            style={{
              marginTop: "0.5rem",
              marginLeft: "0.5rem",
              backgroundColor: "#ff6600",
              color: "#fff",
              fontWeight: "bold",
              padding: "4px 8px", 
              fontSize: "0.75rem", 
              height: "20px",
            }}
          >
            {replyVisibleMap[comment._id] ? "Cancel" : "Reply"}
          </Button>

          {/* Текстовое поле для ответа */}
          {replyVisibleMap[comment._id] && (
            <>
              <TextField
                label="Reply"
                multiline
                fullWidth
                rows={2}
                value={replyTextMap[comment._id] || ""}
                onChange={(e) => handleChange(comment._id, e.target.value)}
                style={{ marginTop: "0.5rem" }}
                variant="outlined"
              />
              <Button
                variant="contained"
                onClick={() => handleReply(comment._id)}
                size="small"
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "#ff6600",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Reply
              </Button>
            </>
          )}
        </Paper>

        {/* Рекурсивно рендерим ответы */}
        {renderComments(comment._id, depth + 1)}
      </div>
    ));
  };

  return <div>{renderComments()}</div>;
};

export default AnswerList;

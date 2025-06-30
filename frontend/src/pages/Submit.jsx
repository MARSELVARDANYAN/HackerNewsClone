import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { postSubmit } from "../services/api";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      content: content,
    };

    try {
      console.log("Submitting form data:", formData);
      const response = await postSubmit(formData);
      console.log("✅ Post added:", response.data);
      setTitle("");
      setContent("");
      navigate("/newest"); 
    } catch (error) {
      console.error("❌ error in added posting:", error.message);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h6" gutterBottom>
        Plase create post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#ff6600" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Submit;

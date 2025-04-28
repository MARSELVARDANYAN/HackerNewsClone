import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { postShow } from "../services/api"; 
import generateToken from "../utils/decodeJWT";
import { useNavigate } from "react-router-dom"; 

const CreateShowPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    content: "",
    type: "link", 
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authorId = generateToken()
      await postShow({...formData, authorId});
      alert("Post created successfully!");
      navigate(formData.type === "job" ? "/jobs" : formData.type === "show" ? "/show" : "/newest");
    } catch (err) {
      console.error("Failed to create post", err);
      alert("Failed to create post");
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  }

  const handleClear = () => {
    setFormData({
      title: "",
      url: "",
      content: "",
      type: "link", 
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="URL"
        name="url"
        value={formData.url}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      <TextField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        select
        fullWidth
        required
        margin="normal"
      >
        <MenuItem value="show">Show</MenuItem>
        <MenuItem value="job">Job</MenuItem>
        <MenuItem value="link">Link</MenuItem>
      </TextField>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem", backgroundColor: "#ff6600", color: "white" }}
      >
        Create 
      </Button>
      <Button
        type="button"
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem", marginLeft: "1rem", backgroundColor: "#ff6600", color: "white" }}
        onClick={handleClear}
      >
        Clear
      </Button>
      <Button
        type="button"
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem", marginLeft: "1rem", backgroundColor: "#ff6600", color: "white" }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      
      <Button
        type="button"
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem", marginLeft: "1rem", backgroundColor: "#ff6600", color: "white", }}
        onClick={() => navigate("/")}
      >
        Home
      </Button>
    </form>
  );
};

export default CreateShowPage;

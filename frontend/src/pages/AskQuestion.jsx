import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getUser, postAsk } from "../services/api";
import { useNavigate } from "react-router-dom";
import generateToken from "../utils/decodeJWT";

const AskQuestion = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const isPrivate = watch("isPrivate", false);

  useEffect(() => {
    getUser()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error loading users:", error));
  }, []);

  const onSubmit = (data) => {
    const curentId = generateToken();
    const payload = {
      ...data,
      authorId: curentId,
    };

    if (isPrivate && data.recipientId) {
      payload.recipientId = data.recipientId;
    }

    console.log("Sending data:", payload);
    postAsk(payload)
      .then((response) => {
        navigate("/questions");
        console.log("Question submitted:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting question:", error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 800, mx: "auto", mt: 4 }}
    >
      <Typography variant="h6" gutterBottom>
        Ask a Question
      </Typography>
      <Button
        style={{ backgroundColor: "#ff6600", color: "white" }}
        onClick={() => navigate("/questions")}
      >
        Questions
      </Button>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{
          required: "Title is required",
          minLength: { value: 5, message: "Minimum 5 characters" },
          maxLength: { value: 100, message: "Maximum 100 characters" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            inputProps={{
              style: { wordBreak: "break-word", overflow: "hidden" },
            }}
          />
        )}
      />

      <Controller
        name="content"
        control={control}
        defaultValue=""
        rules={{
          required: "Content is required",
          minLength: { value: 10, message: "Minimum 10 characters" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.content}
            helperText={errors.content ? errors.content.message : ""}
          />
        )}
      />

      <FormControlLabel
        control={
          <Controller
            name="isAnonymous"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        }
        label="Ask Anonymously"
      />

      <FormControlLabel
        control={
          <Controller
            name="isPrivate"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        }
        label="Private Question"
      />

      {isPrivate && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="recipient-label">Recipient</InputLabel>
          <Controller
            name="recipientId"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) =>
                isPrivate && !value ? "Please select a recipient" : true,
            }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="recipient-label"
                label="Recipient"
                error={!!errors.recipientId}
              >
                {users?.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.recipientId && (
            <Typography variant="caption" color="error">
              {errors.recipientId.message}
            </Typography>
          )}
        </FormControl>
      )}

      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#ff6600" }}
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AskQuestion;

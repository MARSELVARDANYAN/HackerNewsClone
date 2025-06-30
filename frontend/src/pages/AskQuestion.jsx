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
  Paper,
  Avatar,
  Chip,
  Fade,
  Grow,
  useTheme,
  CircularProgress
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getUser, postAsk } from "../services/api";
import { useNavigate } from "react-router-dom";
import generateToken from "../utils/decodeJWT";
import {
  HelpOutline,
  QuestionAnswer,
  Person,
  Lock,
  Public,
  Send,
  ArrowBack
} from "@mui/icons-material";

const AskQuestion = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      isAnonymous: false,
      isPrivate: false,
      recipientId: ""
    }
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isPrivate = watch("isPrivate", false);
  const isAnonymous = watch("isAnonymous", false);

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
        setLoading(false);
      });
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

    setLoading(true);
    postAsk(payload)
      .then(() => {
        navigate("/questions");
      })
      .catch((error) => {
        console.error("Error submitting question:", error);
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        backgroundColor: theme.palette.mode === "dark" 
          ? theme.palette.grey[900] 
          : theme.palette.grey[100]
      }}
    >
      <Grow in={true} timeout={500}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 700,
            p: { xs: 2, md: 4 },
            borderRadius: "16px",
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[10]
          }}
        >
          <Box 
            display="flex" 
            alignItems="center" 
            mb={4}
            sx={{ 
              borderBottom: `2px solid ${theme.palette.divider}`,
              pb: 2 
            }}
          >
            <HelpOutline 
              sx={{ 
                fontSize: 40, 
                color: theme.palette.primary.main,
                mr: 2 
              }} 
            />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Ask a Question
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
          >
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
                maxLength: { value: 100, message: "Maximum 100 characters" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={
                    <Box display="flex" alignItems="center">
                      <QuestionAnswer sx={{ mr: 1, fontSize: 20 }} />
                      <span>Question Title</span>
                    </Box>
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  InputProps={{
                    sx: { 
                      borderRadius: "12px",
                      fontSize: "1.1rem"
                    }
                  }}
                  InputLabelProps={{
                    sx: { 
                      display: "flex", 
                      alignItems: "center" 
                    }
                  }}
                />
              )}
            />

            <Controller
              name="content"
              control={control}
              rules={{
                required: "Content is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={
                    <Box display="flex" alignItems="center">
                      <QuestionAnswer sx={{ mr: 1, fontSize: 20 }} />
                      <span>Detailed Question</span>
                    </Box>
                  }
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  minRows={5}
                  maxRows={10}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                  InputProps={{
                    sx: { 
                      borderRadius: "12px",
                      fontSize: "1.1rem"
                    }
                  }}
                />
              )}
            />

            <Box 
              display="flex" 
              flexWrap="wrap" 
              gap={2}
              mt={3}
              mb={2}
            >
              <FormControlLabel
                control={
                  <Controller
                    name="isAnonymous"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        icon={<Person />}
                        checkedIcon={<Person color="primary" />}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          color: theme.palette.primary.main,
                          "&.Mui-checked": {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    )}
                  />
                }
                label={
                  <Chip 
                    label="Ask Anonymously" 
                    variant={isAnonymous ? "filled" : "outlined"} 
                    color={isAnonymous ? "primary" : "default"}
                    icon={<Person />}
                  />
                }
              />

              <FormControlLabel
                control={
                  <Controller
                    name="isPrivate"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        icon={<Public />}
                        checkedIcon={<Lock color="primary" />}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          color: theme.palette.primary.main,
                          "&.Mui-checked": {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    )}
                  />
                }
                label={
                  <Chip 
                    label={isPrivate ? "Private Question" : "Public Question"} 
                    variant={isPrivate ? "filled" : "outlined"} 
                    color={isPrivate ? "primary" : "default"}
                    icon={isPrivate ? <Lock /> : <Public />}
                  />
                }
              />
            </Box>

            <Fade in={isPrivate} timeout={300}>
              <Box mt={2} mb={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="recipient-label">
                    <Box display="flex" alignItems="center">
                      <Person sx={{ mr: 1, fontSize: 20 }} />
                      <span>Select Recipient</span>
                    </Box>
                  </InputLabel>
                  <Controller
                    name="recipientId"
                    control={control}
                    rules={{
                      validate: (value) =>
                        isPrivate && !value ? "Please select a recipient" : true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="recipient-label"
                        label="Select Recipient"
                        error={!!errors.recipientId}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 300,
                              borderRadius: "12px",
                              mt: 1
                            }
                          }
                        }}
                        sx={{ borderRadius: "12px" }}
                      >
                        {loading ? (
                          <MenuItem disabled>
                            <Box display="flex" justifyContent="center" width="100%">
                              <CircularProgress size={24} />
                            </Box>
                          </MenuItem>
                        ) : (
                          users?.map((user) => (
                            <MenuItem key={user._id} value={user._id}>
                              <Box display="flex" alignItems="center">
                                <Avatar 
                                  sx={{ 
                                    width: 30, 
                                    height: 30, 
                                    mr: 2,
                                    bgcolor: theme.palette.primary.main,
                                    fontSize: "0.8rem"
                                  }}
                                >
                                  {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                                <Typography>{user.username}</Typography>
                              </Box>
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    )}
                  />
                  {errors.recipientId && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
                      {errors.recipientId.message}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Fade>

            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/questions")}
                sx={{
                  borderRadius: "50px",
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2
                  }
                }}
              >
                Back to Questions
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !isValid}
                startIcon={<Send />}
                sx={{
                  borderRadius: "50px",
                  px: 4,
                  py: 1,
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: theme.shadows[4],
                  "&:hover": {
                    boxShadow: theme.shadows[8],
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease"
                  },
                  "&:disabled": {
                    background: theme.palette.grey[400]
                  }
                }}
              >
                {loading ? "Submitting..." : "Publish Question"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
};

export default AskQuestion;
import React, { useEffect, useState } from "react";
import { 
  Typography, 
  Paper, 
  CircularProgress, 
  Box, 
  Avatar, 
  IconButton, 
  Collapse,
  useTheme
} from "@mui/material";
import { 
  formatDistanceToNow, 
  parseISO 
} from "date-fns";
import { 
  ExpandMore, 
  Comment, 
  ThumbUp, 
  ThumbDown
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { fetchAllComments } from "../services/api";

const ExpandButton = styled(IconButton)(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CommentCard = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  transition: "all 0.3s ease",
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[2],
  "&:hover": {
    boxShadow: theme.shadows[6],
    transform: "translateY(-2px)",
  },
}));

const AllComments = () => {
  const theme = useTheme();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetchAllComments(); 
        setComments(res.data);
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="50vh"
        width="100%"
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: "95%", // Основное изменение здесь
      mx: "auto", 
      p: { xs: 1, sm: 3 },
      mt: 2
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          color: theme.palette.primary.main,
          textAlign: "center",
          mb: 4,
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 4,
            background: theme.palette.primary.main,
            borderRadius: 2
          }
        }}
      >
        Community Comments
      </Typography>

      {comments.length === 0 ? (
        <Box 
          textAlign="center" 
          py={10}
          sx={{
            border: `2px dashed ${theme.palette.divider}`,
            borderRadius: 4,
            width: "100%"
          }}
        >
          <Comment sx={{ fontSize: 60, color: theme.palette.text.disabled }} />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No comments yet
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Be the first to share your thoughts!
          </Typography>
        </Box>
      ) : (
        comments
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((comment) => {
            const username = comment.authorId?.username || "Anonymous";
            const initials = username.split(" ").map(n => n[0]).join("").toUpperCase();
            const createdAt = formatDistanceToNow(parseISO(comment.createdAt), {
              addSuffix: true,
            });
            const isExpanded = !!expandedComments[comment._id];
            
            return (
              <CommentCard key={comment._id} elevation={0} sx={{ width: "100%" }}>
                <Box 
                  display="flex" 
                  alignItems="center" 
                  p={2}
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? theme.palette.grey[800] 
                      : theme.palette.grey[100],
                    width: "100%"
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      mr: 2,
                      width: 40,
                      height: 40
                    }}
                  >
                    {initials.slice(0, 2)}
                  </Avatar>
                  
                  <Box flexGrow={1} width="calc(100% - 120px)">
                    <Typography 
                      variant="subtitle1" 
                      fontWeight={600}
                      noWrap
                      sx={{ 
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {username}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="textSecondary"
                      sx={{ display: "block" }}
                    >
                      {createdAt}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" sx={{ minWidth: 130 }}>
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <ThumbUp fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" sx={{ mr: 2 }}>
                      24
                    </Typography>
                    
                    <IconButton size="small">
                      <ThumbDown fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Collapse in={isExpanded} collapsedSize={72}>
                  <Box p={2} width="100%">
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                        wordBreak: "break-word"
                      }}
                    >
                      {comment.content}
                    </Typography>
                  </Box>
                </Collapse>
                
                <Box 
                  display="flex" 
                  justifyContent="flex-end" 
                  p={1}
                  sx={{ 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? theme.palette.grey[800] 
                      : theme.palette.grey[100],
                    width: "99%"
                  }}
                >
                  <ExpandButton
                    expand={isExpanded}
                    onClick={() => handleExpandClick(comment._id)}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                    size="small"
                  >
                    <ExpandMore 
                      sx={{ 
                        transform: isExpanded ? "rotate(180deg)" : "none" 
                      }} 
                    />
                  </ExpandButton>
                </Box>
              </CommentCard>
            );
          })
      )}
    </Box>
  );
};

export default AllComments;
import React, { useEffect, useState } from "react";
import { getJobs } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const toggleExpand = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      {jobs.map((job) => (
        <Card
          key={job._id}
          sx={{
            marginBottom: "2rem",
            padding: "0rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "16px",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ padding: "0.7rem" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {job.title}
            </Typography>

            {job.content && (
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ marginTop: "1rem", wordBreak: "break-word" }}
              >
                {job.content.substring(0, 200)}...
              </Typography>
            )}

            <Collapse in={expandedJobs[job._id]}>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ marginTop: "1rem", wordBreak: "break-word" }}
              >
                {job.content}
              </Typography>
            </Collapse>

            {/* URL */}
            {job.url && (
              <Typography
                variant="body1"
                color="primary"
                sx={{
                  wordBreak: "break-word",
                  fontSize: "1.2rem",
                  marginTop: "1rem",
                }}
              >
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {job.url}
                </a>
              </Typography>
            )}

            {/* buttons */}
            <Box sx={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                style={{
                  border: "1px solid #ff6600",
                  color: "#ff6600",
                  marginTop: "0.5em",
                  paddingTop: "0.1em",
                  paddingBottom: "0.1em",
                }}
                onClick={() => toggleExpand(job._id)}
              >
                {expandedJobs[job._id] ? "Hide Details" : "View Details"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                color="primary"
                style={{
                  border: "1px solid #ff6600",
                  color: "#ff6600",
                  marginTop: "0.5em",
                  paddingTop: "0.1em",
                  paddingBottom: "0.1em",
                }}
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                Open Full Page
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default JobsPage;

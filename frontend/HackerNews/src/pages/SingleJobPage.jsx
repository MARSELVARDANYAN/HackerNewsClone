import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobs } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";

const SingleJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobs();
        const foundJob = data.data.find((job) => job._id === id);
        if (foundJob) {
          setJob(foundJob);
        } else {
          console.error("Job not found");
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!job) {
    return <Typography align="center">Job not found</Typography>;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "auto",
        padding: "2rem",
      }}
    >
      <Card >
        <CardContent style={{ padding: "0.7rem", maxWidth: "1200px" }}>
          <Typography variant="h4" gutterBottom>
            {job.title}
          </Typography>

          {job.url && (
            <Typography variant="body1" color="textSecondary" gutterBottom>
              <Link
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="warning"
              >
                {job.url}
              </Link>
            </Typography>
          )}

          {job.createdAt && (
            <Typography
              variant="caption"
              color="textSecondary"
              display="block"
              gutterBottom
            >
              Posted on: {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          )}

          <Typography
            variant="body1"
            style={{ marginTop: "1rem", whiteSpace: "pre-line" }}
          >
            {job.content}
          </Typography>

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
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleJobPage;

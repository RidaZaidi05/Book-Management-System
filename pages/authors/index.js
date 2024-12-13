import { useState, useEffect } from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("/api/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <h1 className="heading" style={{ marginTop: "20px" }}>
        Authors
      </h1>
      <Grid container spacing={2}>
        {authors.map((author) => (
          <Grid item xs={12} sm={6} md={4} key={author.id}>
            <Paper
              sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                minHeight: "150px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginBottom: 1, color: "text.primary" }} // Use primary text color for the title
              >
                <strong>Author Name:</strong> {author.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: 1 }} // Use secondary text color for the body text
              >
                <strong>Author ID:</strong> {author.id}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary" }} // Slightly lighter color for biography
              >
                <strong>Author Biography:</strong> {author.biography}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AuthorPage;

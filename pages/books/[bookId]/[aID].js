import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography, Paper, CircularProgress } from '@mui/material';

const AuthorDetail = () => {
  const r = useRouter();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (r.query.aID) {
      fetch(`/api/authors/${r.query.aID}`)
        .then((res) => res.json())
        .then((data) => {
          setAuthor(data);
          setLoading(false);
        });
    }
  }, [r.query.aID]);

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <h1 className='heading' style={{marginTop:'20px'}}>Author Details</h1>
      <Grid
        container
        justifyContent="center"
        spacing={3}
        sx={{
          padding: 2,
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: 'background.paper',
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              <strong>Author ID:</strong> {author.id}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Author Name:</strong> {author.name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }} >
              <strong>Author Biography:</strong> {author.biography}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthorDetail;

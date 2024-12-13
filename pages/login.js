import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext'; 
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const redirectTo = router.query.redirectTo || '/books';
      router.push(redirectTo);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400, 
          p: 4,
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: '#333', fontWeight:'bolder' }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#555' }, // Lighter label color
              '& .MuiOutlinedInput-root': { 
                borderColor: '#ddd' 
              },
              '& .MuiOutlinedInput-root:hover': { 
                borderColor: '#3f51b5' 
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#555' },
              '& .MuiOutlinedInput-root': {
                borderColor: '#ddd',
              },
              '& .MuiOutlinedInput-root:hover': {
                borderColor: '#3f51b5',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              padding: '10px',
              fontSize: '1rem',
              backgroundColor: 'var(--accent-color)', 
              '&:hover': { backgroundColor: '#2c387e' },
                color: 'white', 
                  '&:hover': {
                    backgroundColor: 'var(--accent-dark)'
                  }
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

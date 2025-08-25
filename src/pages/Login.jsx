import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock users
const mockUsers = [
  { email: 'agent@agence.com', password: '123456' },
  { email: 'admin@agence.com', password: 'adminpass' }
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setError('');
      navigate('/home');
    } else {
      setError('Identifiants invalides');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2} align="center">
          Connexion Agent
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Se connecter
        </Button>
      </Paper>
    </Box>
  );
}
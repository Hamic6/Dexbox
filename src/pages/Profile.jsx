import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  TextField,
  Button,
  useTheme,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LockResetIcon from '@mui/icons-material/LockReset';

const mockUser = {
  name: 'Agent Dexbox',
  email: 'agent@dexbox.com',
  role: 'Admin',
  avatar: '',
};

export default function Profile() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [form, setForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    role: mockUser.role,
    avatar: mockUser.avatar,
  });
  const [avatarPreview, setAvatarPreview] = useState(mockUser.avatar);
  const fileInputRef = useRef();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Mock upload photo
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setAvatarPreview(ev.target.result);
        setForm(f => ({ ...f, avatar: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock reset password
  const handleResetPassword = () => {
    alert('Lien de réinitialisation envoyé (mock) !');
  };

  const handleSave = () => {
    alert('Profil mis à jour (mock) !');
  };

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        maxWidth: 500,
        mx: 'auto',
        minHeight: '80vh',
        bgcolor: isDark ? '#111' : '#fff', // Noir en sombre, blanc en clair
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          mb: 2,
          color: isDark ? '#fff' : '#111', // Texte blanc en sombre, noir en clair
        }}
      >
        Mon profil
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          boxShadow: 2,
          bgcolor: isDark ? '#111' : '#fff', // Noir en sombre, blanc en clair
          color: isDark ? '#fff' : '#111',   // Texte blanc en sombre, noir en clair
        }}
      >
        <Stack alignItems="center" spacing={2} mb={2} position="relative">
          <Box sx={{ position: 'relative', width: 80, height: 80 }}>
            <Avatar
              src={avatarPreview}
              sx={{
                width: 80,
                height: 80,
                bgcolor: isDark ? '#222' : '#eee', // Gris foncé en sombre, gris clair en clair
                color: isDark ? '#fff' : '#111',
              }}
            >
              {!avatarPreview && <PersonIcon fontSize="large" />}
            </Avatar>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: isDark ? '#222' : '#eee', // Gris foncé en sombre, gris clair en clair
                color: isDark ? '#fff' : '#111',
                width: 32,
                height: 32,
                boxShadow: 2,
                '&:hover': { bgcolor: isDark ? '#333' : '#ddd' },
              }}
              onClick={() => fileInputRef.current.click()}
              title="Changer la photo de profil"
            >
              <PhotoCamera fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {form.name}
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? '#bbb' : '#555' }}>
            {form.role}
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <TextField
            label="Nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ style: { color: isDark ? '#fff' : '#111' } }}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            type="email"
            InputLabelProps={{ style: { color: isDark ? '#fff' : '#111' } }}
          />
          <TextField
            label="Rôle"
            name="role"
            value={form.role}
            fullWidth
            disabled
            InputLabelProps={{ style: { color: isDark ? '#fff' : '#111' } }}
          />
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              bgcolor: isDark ? '#222' : '#eee', // Gris foncé en sombre, gris clair en clair
              color: isDark ? '#fff' : '#111',
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: 2,
              mt: 2,
              '&:hover': {
                bgcolor: isDark ? '#333' : '#ddd',
              },
            }}
          >
            Enregistrer
          </Button>
          <Button
            variant="outlined"
            startIcon={<LockResetIcon />}
            onClick={handleResetPassword}
            sx={{
              mt: 1,
              borderRadius: 2,
              fontWeight: 700,
              color: isDark ? '#fff' : '#111',
              borderColor: isDark ? '#fff' : '#111',
              '&:hover': {
                bgcolor: isDark ? '#222' : '#eee',
                borderColor: isDark ? '#fff' : '#111',
              },
            }}
          >
            Réinitialiser le mot de passe
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
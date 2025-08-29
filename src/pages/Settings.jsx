import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Switch,
  FormControlLabel,
  Button,
  useTheme,
} from '@mui/material';

export default function Settings() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  const handleSave = () => {
    alert('Paramètres enregistrés (mock) !');
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
        Paramètres
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
        <Stack spacing={3}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={e => setNotifications(e.target.checked)}
                color="default"
              />
            }
            label="Recevoir les notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={newsletter}
                onChange={e => setNewsletter(e.target.checked)}
                color="default"
              />
            }
            label="Recevoir la newsletter"
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
        </Stack>
      </Paper>
    </Box>
  );
}
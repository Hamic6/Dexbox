import React from 'react';
import { Box, Typography, Paper, useTheme, Stack, TextField, Button } from '@mui/material';

export default function Support() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    alert('Message envoyé à l\'assistance (mock) !');
    setMessage('');
  };

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        maxWidth: 500,
        mx: 'auto',
        minHeight: '80vh',
        bgcolor: isDark ? '#111' : '#fff',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          mb: 2,
          color: isDark ? '#fff' : '#111',
        }}
      >
        Assistance
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          boxShadow: 2,
          bgcolor: isDark ? '#111' : '#fff',
          color: isDark ? '#fff' : '#111',
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          Une question ou un problème ? Écrivez-nous ci-dessous, notre équipe vous répondra rapidement.<br />
          Vous pouvez aussi appeler le support au <strong>+243 820 000 000</strong>.
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Votre message"
            multiline
            minRows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleSend}
            sx={{
              bgcolor: isDark ? '#222' : '#eee',
              color: isDark ? '#fff' : '#111',
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: 2,
              '&:hover': {
                bgcolor: isDark ? '#333' : '#ddd',
              },
            }}
          >
            Envoyer
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
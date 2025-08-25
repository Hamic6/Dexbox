import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Bienvenue sur l’application Agence Voyage !
      </Typography>
      <Typography variant="body1">
        Sélectionnez une section dans la barre latérale pour commencer.
      </Typography>
    </Box>
  );
}
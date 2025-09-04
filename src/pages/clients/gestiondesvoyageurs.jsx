import React from 'react';
import { Box, Typography } from '@mui/material';

export default function GestionDesVoyageurs() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Gestion des voyageurs
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Ici vous pouvez gérer les voyageurs liés aux clients.
      </Typography>
    </Box>
  );
}
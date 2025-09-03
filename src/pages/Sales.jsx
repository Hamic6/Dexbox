import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Sales() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Espace ventes
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Cette page sera dédiée à la gestion des ventes et réservations.
      </Typography>
    </Box>
  );
}
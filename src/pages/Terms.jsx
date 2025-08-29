import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

export default function Terms() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        maxWidth: 800,
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
        Conditions d'utilisation
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
          Bienvenue sur l’application Dexbox Technologies. En utilisant cette application, vous acceptez les conditions suivantes :
        </Typography>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Respect des données :</strong> Vos informations personnelles sont utilisées uniquement dans le cadre de la gestion des réservations et ne sont jamais partagées sans votre consentement.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Utilisation responsable :</strong> Toute utilisation frauduleuse ou abusive de l’application est interdite et peut entraîner la suspension du compte.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Sécurité :</strong> Nous mettons tout en œuvre pour garantir la sécurité de vos données, mais il vous appartient de choisir un mot de passe sécurisé et de ne pas le partager.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Support :</strong> Pour toute question ou problème, contactez l’assistance via la page dédiée.
            </Typography>
          </li>
        </ul>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Ces conditions peuvent évoluer. Consultez régulièrement cette page pour rester informé.
        </Typography>
      </Paper>
    </Box>
  );
}
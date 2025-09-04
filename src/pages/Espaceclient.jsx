import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, IconButton, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Mock transactions des clients
const transactions = [
  { client: 'Alice', destination: 'Paris', date: '2025-08-27', statut: 'Confirmée', montant: '1200€', type: 'Réservation' },
  { client: 'Bob', destination: 'Rome', date: '2025-08-28', statut: 'En attente', montant: '950€', type: 'Réservation' },
  { client: 'Charlie', destination: 'Tokyo', date: '2025-08-29', statut: 'Confirmée', montant: '2100€', type: 'Réservation' },
  { client: 'Diana', destination: 'New York', date: '2025-08-30', statut: 'Annulée', montant: '0€', type: 'Annulation' },
  { client: 'Eve', destination: 'Sydney', date: '2025-08-31', statut: 'Confirmée', montant: '1800€', type: 'Réservation' },
];

export default function Espaceclient() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Espace client
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Retrouvez ici l’historique des transactions et réservations des clients.
      </Typography>
      <Paper
        sx={{
          p: { xs: 1, md: 2 },
          overflowX: 'auto',
          borderRadius: 3,
          boxShadow: 2,
          bgcolor: isDark ? '#111' : '#fff',
          color: isDark ? '#fff' : '#111',
          mb: 2,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Transactions récentes
          </Typography>
          <IconButton>
            <MoreVertIcon sx={{ color: isDark ? '#fff' : '#111' }} />
          </IconButton>
        </Stack>
        <TableContainer sx={{ minWidth: 320 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: isDark ? '#222' : '#fafafa' }}>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Client</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Destination</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Date</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Type</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Montant</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row, idx) => (
                <TableRow key={idx} sx={{ bgcolor: idx % 2 ? (isDark ? '#181818' : '#f5f5f5') : 'inherit' }}>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.client}</TableCell>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.destination}</TableCell>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.date}</TableCell>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.type}</TableCell>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.montant}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        row.statut === 'Confirmée'
                          ? (isDark ? '#4caf50' : '#388e3c')
                          : row.statut === 'Annulée'
                          ? (isDark ? '#f44336' : '#d32f2f')
                          : (isDark ? '#ff9800' : '#f57c00'),
                      fontWeight: 600,
                    }}
                  >
                    {row.statut}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
  Pagination,
  useMediaQuery,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';

// Mock transactions des clients
const transactions = [
  { client: 'Alice', destination: 'Paris', date: '2025-08-27', statut: 'Confirmée', montant: '1200€', type: 'Réservation' },
  { client: 'Bob', destination: 'Rome', date: '2025-08-28', statut: 'En attente', montant: '950€', type: 'Réservation' },
  { client: 'Charlie', destination: 'Tokyo', date: '2025-08-29', statut: 'Confirmée', montant: '2100€', type: 'Réservation' },
  { client: 'Diana', destination: 'New York', date: '2025-08-30', statut: 'Annulée', montant: '0€', type: 'Annulation' },
  { client: 'Eve', destination: 'Sydney', date: '2025-08-31', statut: 'Confirmée', montant: '1800€', type: 'Réservation' },
];

const ROWS_PER_PAGE = 3;

export default function Espaceclient() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery('(max-width:600px)');

  // Pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(transactions.length / ROWS_PER_PAGE);
  const paginatedTransactions = transactions.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Example: show snackbar on row click
  const handleRowClick = (row) => {
    setSnackbarMsg(`Transaction de ${row.client} sélectionnée`);
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 1100, mx: 'auto' }}>
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
        <Box
          sx={{
            width: '100%',
            overflowX: 'auto',
          }}
        >
          <TableContainer
            sx={{
              minWidth: isMobile ? 120 : 500, // largeur minimale très réduite sur mobile
              width: '100%',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: isDark ? '#222' : '#fafafa' }}>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111', minWidth: isMobile ? 30 : 90, px: isMobile ? 0.5 : 2 }}>Client</TableCell>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111', minWidth: isMobile ? 30 : 90, px: isMobile ? 0.5 : 2 }}>Destination</TableCell>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111', minWidth: isMobile ? 30 : 90, px: isMobile ? 0.5 : 2 }}>Date</TableCell>
                  {!isMobile && (
                    <TableCell sx={{ color: isDark ? '#fff' : '#111', minWidth: 90 }}>Type</TableCell>
                  )}
                  {!isMobile && (
                    <TableCell sx={{ color: isDark ? '#fff' : '#111', minWidth: 90 }}>Montant</TableCell>
                  )}
                  <TableCell sx={{ color: isDark ? '#fff' : '#111', minWidth: isMobile ? 30 : 90, px: isMobile ? 0.5 : 2 }}>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTransactions.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      bgcolor: idx % 2 ? (isDark ? '#181818' : '#f5f5f5') : 'inherit',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: isDark ? '#222' : '#e3f2fd' },
                    }}
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell sx={{ color: isDark ? '#fff' : '#111', fontSize: isMobile ? '0.75rem' : '1rem', px: isMobile ? 0.5 : 2 }}>{row.client}</TableCell>
                    <TableCell sx={{ color: isDark ? '#fff' : '#111', fontSize: isMobile ? '0.75rem' : '1rem', px: isMobile ? 0.5 : 2 }}>{row.destination}</TableCell>
                    <TableCell sx={{ color: isDark ? '#fff' : '#111', fontSize: isMobile ? '0.75rem' : '1rem', px: isMobile ? 0.5 : 2 }}>{row.date}</TableCell>
                    {!isMobile && (
                      <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.type}</TableCell>
                    )}
                    {!isMobile && (
                      <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.montant}</TableCell>
                    )}
                    <TableCell sx={{ px: isMobile ? 0.5 : 2 }}>
                      <Chip
                        label={row.statut}
                        color={
                          row.statut === 'Confirmée'
                            ? 'success'
                            : row.statut === 'Annulée'
                            ? 'error'
                            : 'warning'
                        }
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: isMobile ? '0.7rem' : '1rem',
                          px: isMobile ? 0.5 : 1.5,
                          minWidth: isMobile ? 30 : 90,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            size="small"
          />
        </Stack>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
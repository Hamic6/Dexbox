import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

// Mock reservations
const mockReservations = [
  {
    id: 1,
    client: 'Alice Dupont',
    destination: 'Paris',
    date: '2025-09-10',
    status: 'Confirmée',
  },
  {
    id: 2,
    client: 'Bob Martin',
    destination: 'Rome',
    date: '2025-09-12',
    status: 'En attente',
  },
  {
    id: 3,
    client: 'Charlie Leroy',
    destination: 'Tokyo',
    date: '2025-09-15',
    status: 'Annulée',
  },
];

export default function Reservations() {
  const theme = useTheme();
  const [reservations, setReservations] = useState(mockReservations);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [form, setForm] = useState({
    client: '',
    destination: '',
    date: '',
    status: 'En attente',
  });

  // Pagination states
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // Barre de recherche
  const [search, setSearch] = useState('');

  const isDark = theme.palette.mode === 'dark';

  // Filtrage des réservations selon la recherche
  const filteredReservations = reservations.filter(r =>
    r.client.toLowerCase().includes(search.toLowerCase()) ||
    r.destination.toLowerCase().includes(search.toLowerCase()) ||
    r.status.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredReservations.length / rowsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Dialog handlers
  const handleOpen = () => {
    setForm({ client: '', destination: '', date: '', status: 'En attente' });
    setSelectedReservation(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Menu handlers
  const handleMenuOpen = (event, reservation) => {
    setAnchorEl(event.currentTarget);
    setSelectedReservation(reservation);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReservation(null);
  };

  // Add or edit reservation
  const handleSave = () => {
    if (selectedReservation) {
      setReservations(
        reservations.map(r =>
          r.id === selectedReservation.id ? { ...selectedReservation, ...form } : r
        )
      );
    } else {
      setReservations([
        ...reservations,
        { ...form, id: Date.now() },
      ]);
    }
    setOpen(false);
  };

  // Delete reservation
  const handleDelete = () => {
    setReservations(reservations.filter(r => r.id !== selectedReservation.id));
    handleMenuClose();
  };

  // Edit reservation
  const handleEdit = () => {
    setForm(selectedReservation);
    setOpen(true);
    handleMenuClose();
  };

  // Reset page when search changes
  React.useEffect(() => {
    setPage(1);
  }, [search, rowsPerPage]);

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        maxWidth: 1100,
        mx: 'auto',
        minHeight: '80vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: { xs: 'center', md: 'left' },
          mb: 2,
          color: isDark ? '#fff' : '#111',
        }}
      >
        Gestion des réservations
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 1, md: 2 },
          borderRadius: 3,
          boxShadow: 2,
          bgcolor: isDark ? '#111' : '#fff',
          color: isDark ? '#fff' : '#111',
          mb: 3,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
          mb={2}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Liste des réservations
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              bgcolor: isDark ? '#fff' : '#111',
              color: isDark ? '#111' : '#fff',
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: 2,
              '&:hover': {
                bgcolor: isDark ? '#eee' : '#222',
              },
            }}
          >
            Ajouter une réservation
          </Button>
        </Stack>
        {/* Barre de recherche */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher par client, destination ou statut"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Stack>
        {/* Pagination controls */}
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} mb={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Lignes/page</InputLabel>
            <Select
              value={rowsPerPage}
              label="Lignes/page"
              onChange={e => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={9}>9</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            size="small"
          />
        </Stack>
        <Grid container spacing={2}>
          {paginatedReservations.map(reservation => (
            <Grid item xs={12} sm={6} md={4} key={reservation.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 1,
                  bgcolor: isDark ? '#181818' : '#fafafa',
                  color: isDark ? '#fff' : '#111',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 4,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mb: 1,
                    bgcolor: isDark ? '#222' : '#eee',
                    color: isDark ? '#fff' : '#111',
                  }}
                >
                  <FlightTakeoffIcon fontSize="large" />
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {reservation.client}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5, color: isDark ? '#bbb' : '#555' }}>
                  {reservation.destination}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {reservation.date}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color:
                      reservation.status === 'Confirmée'
                        ? '#4caf50'
                        : reservation.status === 'Annulée'
                        ? '#f44336'
                        : '#ff9800',
                  }}
                >
                  {reservation.status}
                </Typography>
                <IconButton
                  aria-label="actions"
                  onClick={e => handleMenuOpen(e, reservation)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: isDark ? '#fff' : '#111',
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Modifier
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Supprimer
          </MenuItem>
        </Menu>
      </Paper>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>
          {selectedReservation ? 'Modifier la réservation' : 'Ajouter une réservation'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Client"
              value={form.client}
              onChange={e => setForm({ ...form, client: e.target.value })}
              fullWidth
              autoFocus
            />
            <TextField
              label="Destination"
              value={form.destination}
              onChange={e => setForm({ ...form, destination: e.target.value })}
              fullWidth
            />
            <TextField
              label="Date"
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Statut"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              fullWidth
              select
              SelectProps={{ native: true }}
            >
              <option value="En attente">En attente</option>
              <option value="Confirmée">Confirmée</option>
              <option value="Annulée">Annulée</option>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: '#fff',
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: 2,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {selectedReservation ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
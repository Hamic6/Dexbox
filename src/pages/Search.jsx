import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Import des logos locaux
import airfranceLogo from '../assets/airfrance.png';
import lufthansaLogo from '../assets/Lufthansa.png';
import royalairmarocLogo from '../assets/royalairmaroc.png';

// Mock results avec logos locaux
const mockResults = [
  {
    id: 1,
    airline: 'Air France',
    from: 'Paris',
    to: 'New York',
    date: '2025-09-15',
    price: '650€',
    status: 'Disponible',
    logo: airfranceLogo,
  },
  {
    id: 2,
    airline: 'Lufthansa',
    from: 'Francfort',
    to: 'Tokyo',
    date: '2025-09-18',
    price: '820€',
    status: 'Disponible',
    logo: lufthansaLogo,
  },
  {
    id: 3,
    airline: 'Royal Air Maroc',
    from: 'Casablanca',
    to: 'Montréal',
    date: '2025-09-20',
    price: '720€',
    status: 'Complet',
    logo: royalairmarocLogo,
  },
];

export default function Search() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [results, setResults] = useState(mockResults);
  const [search, setSearch] = useState({ from: '', to: '', date: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [open, setOpen] = useState(false);

  // Menu handlers
  const handleMenuOpen = (event, result) => {
    setAnchorEl(event.currentTarget);
    setSelectedResult(result);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedResult(null);
  };

  // Dialog handlers (simulate reservation)
  const handleReserve = () => {
    setOpen(true);
    handleMenuClose();
  };
  const handleDialogClose = () => setOpen(false);

  // Simulate search
  const handleSearch = () => {
    setResults(mockResults.filter(r =>
      (!search.from || r.from.toLowerCase().includes(search.from.toLowerCase())) &&
      (!search.to || r.to.toLowerCase().includes(search.to.toLowerCase())) &&
      (!search.date || r.date === search.date)
    ));
  };

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
        Recherche & Réservation de vols
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
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Formulaire de recherche
          </Typography>
        </Stack>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Départ"
              value={search.from}
              onChange={e => setSearch({ ...search, from: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Destination"
              value={search.to}
              onChange={e => setSearch({ ...search, to: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date"
              type="date"
              value={search.date}
              onChange={e => setSearch({ ...search, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
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
            Rechercher
          </Button>
        </Box>
      </Paper>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Résultats
      </Typography>
      <Grid container spacing={2}>
        {results.map(result => (
          <Grid item xs={12} sm={6} md={4} key={result.id}>
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
                  objectFit: 'contain',
                }}
                src={result.logo}
                imgProps={{ style: { objectFit: 'contain', width: '100%', height: '100%' } }}
              >
                {!result.logo && <FlightTakeoffIcon fontSize="large" />}
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {result.airline}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                {result.from} → {result.to}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                {result.date}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                {result.price}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color:
                    result.status === 'Disponible'
                      ? '#4caf50'
                      : '#f44336',
                }}
              >
                {result.status}
              </Typography>
              <IconButton
                aria-label="actions"
                onClick={e => handleMenuOpen(e, result)}
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
        <MenuItem onClick={handleReserve}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Réserver
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Supprimer
        </MenuItem>
      </Menu>
      <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="xs">
        <DialogTitle>Réservation</DialogTitle>
        <DialogContent>
          <Typography>
            La réservation pour ce vol est simulée (intégration Amadeus possible).
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Annuler
          </Button>
          <Button
            onClick={handleDialogClose}
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
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
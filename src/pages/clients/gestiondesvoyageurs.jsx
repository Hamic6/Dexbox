import React, { useState, useEffect } from 'react';
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
  Stack,
  Menu,
  MenuItem,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from '@mui/material/Pagination';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import AddVoyageur from './addVoyageur';

const mockVoyageurs = [
  {
    id: 1,
    prenom: 'Jean',
    nom: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    actif: true,
    notes: '',
    marketing: [],
    travelDocs: [],
    avatar: '',
  },
  {
    id: 2,
    prenom: 'Fatima',
    nom: 'El Amrani',
    email: 'fatima.amrani@email.com',
    phone: '07 98 76 54 32',
    actif: false,
    notes: '',
    marketing: [],
    travelDocs: [],
    avatar: '',
  },
];

export default function GestionDesVoyageurs() {
  const theme = useTheme();
  const [voyageurs, setVoyageurs] = useState(mockVoyageurs);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVoyageur, setSelectedVoyageur] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Recherche
  const [search, setSearch] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const isDark = theme.palette.mode === 'dark';

  // Filtrage des voyageurs selon la recherche
  const filteredVoyageurs = voyageurs.filter(v =>
    (`${v.prenom} ${v.nom}`.toLowerCase().includes(search.toLowerCase()) ||
      (v.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (v.phone || '').toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredVoyageurs.length / rowsPerPage);
  const paginatedVoyageurs = filteredVoyageurs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [search, rowsPerPage]);

  // Menu handlers
  const handleMenuOpen = (event, voyageur) => {
    setAnchorEl(event.currentTarget);
    setSelectedVoyageur(voyageur);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVoyageur(null);
  };

  // Activer/désactiver voyageur (show confirmation dialog)
  const handleToggleActive = () => {
    setConfirmOpen(true);
    setAnchorEl(null);
  };

  // Confirm activation/désactivation
  const handleConfirmToggle = () => {
    setVoyageurs(voyageurs.map(v =>
      v.id === selectedVoyageur.id ? { ...v, actif: !v.actif } : v
    ));
    setSnackbarMsg(
      selectedVoyageur.actif
        ? 'Voyageur désactivé avec succès.'
        : 'Voyageur activé avec succès.'
    );
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setConfirmOpen(false);
    setSelectedVoyageur(null);
  };

  const handleCancelToggle = () => {
    setConfirmOpen(false);
    setSelectedVoyageur(null);
  };

  // Edit voyageur
  const handleEdit = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  // Dupliquer voyageur
  const handleDuplicate = () => {
    if (selectedVoyageur) {
      const newVoyageur = {
        ...selectedVoyageur,
        id: Date.now(),
        prenom: selectedVoyageur.prenom + ' (copie)',
        actif: true,
      };
      setVoyageurs([newVoyageur, ...voyageurs]);
      setSnackbarMsg('Voyageur dupliqué.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setAnchorEl(null);
    }
  };

  // Supprimer voyageur
  const handleDelete = () => {
    setVoyageurs(voyageurs.filter(v => v.id !== selectedVoyageur.id));
    setSnackbarMsg('Voyageur supprimé.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setAnchorEl(null);
    setSelectedVoyageur(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        Gestion des voyageurs
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
            Liste des voyageurs
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
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
            Nouveau Voyageur
          </Button>
        </Stack>
        {/* Barre de recherche */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher par nom, email ou téléphone"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ flex: 1 }}
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
          {paginatedVoyageurs.map(voyageur => (
            <Grid item xs={12} sm={6} md={4} key={voyageur.id}>
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
                  src={voyageur.avatar}
                  sx={{
                    width: 64,
                    height: 64,
                    mb: 1,
                    bgcolor: isDark ? '#222' : '#eee',
                    color: isDark ? '#fff' : '#111',
                  }}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {voyageur.prenom} {voyageur.nom}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5, color: isDark ? '#bbb' : '#555' }}>
                  {voyageur.email}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {voyageur.phone}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                  <PowerSettingsNewIcon
                    color={voyageur.actif ? 'success' : 'error'}
                    sx={{ cursor: 'pointer' }}
                    onClick={e => handleMenuOpen(e, voyageur)}
                  />
                  <Typography variant="caption" sx={{ color: voyageur.actif ? 'success.main' : 'error.main', fontWeight: 600 }}>
                    {voyageur.actif ? 'Actif' : 'Inactif'}
                  </Typography>
                </Stack>
                <IconButton
                  aria-label="actions"
                  onClick={e => handleMenuOpen(e, voyageur)}
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
          <MenuItem onClick={handleToggleActive}>
            <PowerSettingsNewIcon fontSize="small" sx={{ mr: 1, color: selectedVoyageur?.actif ? 'green' : 'red' }} />
            {selectedVoyageur?.actif ? 'Désactiver' : 'Activer'}
          </MenuItem>
          <MenuItem onClick={handleDuplicate}>
            <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
            Dupliquer
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Supprimer
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <PrintIcon fontSize="small" sx={{ mr: 1 }} />
            Imprimer
          </MenuItem>
        </Menu>
      </Paper>
      {/* Dialogs pour ajout/modif à compléter */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedVoyageur ? 'Modifier le voyageur' : 'Nouveau voyageur'}</DialogTitle>
        <DialogContent>
          <AddVoyageur
            voyageur={selectedVoyageur}
            onSave={data => {
              // Ajoute ou modifie le voyageur dans la liste
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
      {/* Confirmation dialog for activation/désactivation */}
      <Dialog open={confirmOpen} onClose={handleCancelToggle}>
        <DialogTitle>Confirmer l'{selectedVoyageur?.actif ? 'désactivation' : 'activation'}</DialogTitle>
        <DialogContent>
          <Typography>
            Voulez-vous vraiment {selectedVoyageur?.actif ? 'désactiver' : 'activer'} ce voyageur&nbsp;?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelToggle} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleConfirmToggle} color={selectedVoyageur?.actif ? 'error' : 'success'} variant="contained">
            {selectedVoyageur?.actif ? 'Désactiver' : 'Activer'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
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
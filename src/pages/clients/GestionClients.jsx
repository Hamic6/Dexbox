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
import ModifierClient from './ModifierClient';
import Clientpdf from './Clientpdf';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

// Mock clients avec statut actif/inactif
const mockClients = [
  {
    id: 1,
    civilite: 'Mme',
    code: 'C001',
    prenom: 'Sophie',
    nom: 'Bernard',
    name: 'Sophie Bernard',
    email: 'sophie@client.com',
    phone: '06 12 34 56 78',
    avatar: '',
    actif: true,
    // autres champs mockés si besoin
  },
  {
    id: 2,
    civilite: 'M.',
    code: 'C002',
    prenom: 'Marc',
    nom: 'Dubois',
    name: 'Marc Dubois',
    email: 'marc@client.com',
    phone: '06 98 76 54 32',
    avatar: '',
    actif: false,
  },
  {
    id: 3,
    civilite: 'Mme',
    code: 'C003',
    prenom: 'Julie',
    nom: 'Martin',
    name: 'Julie Martin',
    email: 'julie@client.com',
    phone: '07 11 22 33 44',
    avatar: '',
    actif: true,
  },
];

export default function GestionClients() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [clients, setClients] = useState(mockClients);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pdfClient, setPdfClient] = useState(null);

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Barre de recherche
  const [search, setSearch] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const isDark = theme.palette.mode === 'dark';

  // Filtrage des clients selon la recherche
  const filteredClients = clients.filter(c =>
    (c.name || `${c.prenom} ${c.nom}` || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / rowsPerPage);
  const paginatedClients = filteredClients.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    setPage(1);
  }, [search, rowsPerPage]);

  // Menu handlers
  const handleMenuOpen = (event, client) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
    setPdfClient(null);
  };

  // Activer/désactiver client (show confirmation dialog)
  const handleToggleActive = () => {
    setConfirmOpen(true);
    setAnchorEl(null);
  };

  // Confirm activation/désactivation
  const handleConfirmToggle = () => {
    setClients(clients.map(c =>
      c.id === selectedClient.id ? { ...c, actif: !c.actif } : c
    ));
    setSnackbarMsg(
      selectedClient.actif
        ? 'Client désactivé avec succès.'
        : 'Client activé avec succès.'
    );
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setConfirmOpen(false);
    setSelectedClient(null);
  };

  const handleCancelToggle = () => {
    setConfirmOpen(false);
    setSelectedClient(null);
  };

  // Edit client
  const handleEdit = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  // Save client modification (reçoit toutes les données du client modifié depuis add.jsx)
  const handleSave = (updatedClient) => {
    setClients(clients.map(c => c.id === updatedClient.id ? { ...updatedClient, name: `${updatedClient.prenom} ${updatedClient.nom}` } : c));
    setSnackbarMsg('Client modifié avec succès.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setOpen(false);
    setSelectedClient(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // PDF download handler
  const handleDownloadPdf = () => {
    setPdfClient(selectedClient);
    setAnchorEl(null);
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
        Gestion des clients
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
            Liste des clients
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/clients/add')}
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
            Ajouter un client
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
          {paginatedClients.map(client => (
            <Grid item xs={12} sm={6} md={4} key={client.id}>
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
                  src={client.avatar}
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
                  {client.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5, color: isDark ? '#bbb' : '#555' }}>
                  {client.email}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {client.phone}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                  <PowerSettingsNewIcon
                    color={client.actif ? 'success' : 'error'}
                    sx={{ cursor: 'pointer' }}
                    onClick={e => handleMenuOpen(e, client)}
                  />
                  <Typography variant="caption" sx={{ color: client.actif ? 'success.main' : 'error.main', fontWeight: 600 }}>
                    {client.actif ? 'Actif' : 'Inactif'}
                  </Typography>
                </Stack>
                <IconButton
                  aria-label="actions"
                  onClick={e => handleMenuOpen(e, client)}
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
            <PowerSettingsNewIcon fontSize="small" sx={{ mr: 1, color: selectedClient?.actif ? 'green' : 'red' }} />
            {selectedClient?.actif ? 'Désactiver' : 'Activer'}
          </MenuItem>
          <MenuItem onClick={handleDownloadPdf}>
            <PictureAsPdfIcon fontSize="small" sx={{ mr: 1 }} />
            Télécharger PDF
          </MenuItem>
        </Menu>
        {/* PDF DownloadLink appears only when requested */}
        {pdfClient && (
          <Box sx={{ display: 'none' }}>
            <Clientpdf client={pdfClient} />
          </Box>
        )}
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Modifier le client</DialogTitle>
        <DialogContent>
          {selectedClient && (
            <ModifierClient
              client={selectedClient}
              onSave={handleSave}
              onCancel={handleClose}
            />
          )}
        </DialogContent>
      </Dialog>
      {/* Confirmation dialog for activation/deactivation */}
      <Dialog open={confirmOpen} onClose={handleCancelToggle}>
        <DialogTitle>Confirmer l'{selectedClient?.actif ? 'désactivation' : 'activation'}</DialogTitle>
        <DialogContent>
          <Typography>
            Voulez-vous vraiment {selectedClient?.actif ? 'désactiver' : 'activer'} ce client&nbsp;?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelToggle} color="inherit">
            Annuler
          </Button>
          <Button onClick={handleConfirmToggle} color={selectedClient?.actif ? 'error' : 'success'} variant="contained">
            {selectedClient?.actif ? 'Désactiver' : 'Activer'}
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
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
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Mock clients
const mockClients = [
  {
    id: 1,
    name: 'Sophie Bernard',
    email: 'sophie@client.com',
    phone: '06 12 34 56 78',
    avatar: '',
  },
  {
    id: 2,
    name: 'Marc Dubois',
    email: 'marc@client.com',
    phone: '06 98 76 54 32',
    avatar: '',
  },
  {
    id: 3,
    name: 'Julie Martin',
    email: 'julie@client.com',
    phone: '07 11 22 33 44',
    avatar: '',
  },
];

export default function Clients() {
  const theme = useTheme();
  const [clients, setClients] = useState(mockClients);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const isDark = theme.palette.mode === 'dark';

  // Dialog handlers
  const handleOpen = () => {
    setForm({ name: '', email: '', phone: '' });
    setSelectedClient(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Menu handlers
  const handleMenuOpen = (event, client) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  // Add or edit client
  const handleSave = () => {
    if (selectedClient) {
      setClients(clients.map(c => (c.id === selectedClient.id ? { ...selectedClient, ...form } : c)));
    } else {
      setClients([
        ...clients,
        { ...form, id: Date.now(), avatar: '' },
      ]);
    }
    setOpen(false);
  };

  // Delete client
  const handleDelete = () => {
    setClients(clients.filter(c => c.id !== selectedClient.id));
    handleMenuClose();
  };

  // Edit client
  const handleEdit = () => {
    setForm(selectedClient);
    setOpen(true);
    handleMenuClose();
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
            Ajouter un client
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {clients.map(client => (
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
          <MenuItem onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Supprimer
          </MenuItem>
        </Menu>
      </Paper>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>
          {selectedClient ? 'Modifier le client' : 'Ajouter un client'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nom"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              fullWidth
              autoFocus
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              fullWidth
              type="email"
            />
            <TextField
              label="Téléphone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              fullWidth
            />
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
            {selectedClient ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
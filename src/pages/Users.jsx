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
  DialogActions,
  Stack,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

// Mock users
const mockUsers = [
  {
    id: 1,
    name: 'Alice Dupont',
    email: 'alice@agence.com',
    role: 'Admin',
    avatar: '',
  },
  {
    id: 2,
    name: 'Bob Martin',
    email: 'bob@agence.com',
    role: 'Agent',
    avatar: '',
  },
  {
    id: 3,
    name: 'Charlie Leroy',
    email: 'charlie@agence.com',
    role: 'Agent',
    avatar: '',
  },
];

export default function Users() {
  const theme = useTheme();
  const [users, setUsers] = useState(mockUsers);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'Agent' });

  // Responsive colors
  const isDark = theme.palette.mode === 'dark';

  // Dialog handlers
  const handleOpen = () => {
    setForm({ name: '', email: '', role: 'Agent' });
    setSelectedUser(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Menu handlers
  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // Add or edit user
  const handleSave = () => {
    if (selectedUser) {
      setUsers(users.map(u => (u.id === selectedUser.id ? { ...selectedUser, ...form } : u)));
    } else {
      setUsers([
        ...users,
        { ...form, id: Date.now(), avatar: '', role: form.role || 'Agent' },
      ]);
    }
    setOpen(false);
  };

  // Delete user
  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    handleMenuClose();
  };

  // Edit user
  const handleEdit = () => {
    setForm(selectedUser);
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
        Gestion des utilisateurs
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
            Liste des utilisateurs
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
            Ajouter un utilisateur
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {users.map(user => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
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
                  src={user.avatar}
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
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5, color: isDark ? '#bbb' : '#555' }}>
                  {user.email}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <LockIcon sx={{ fontSize: 18, color: user.role === 'Admin' ? '#ff9800' : '#1976d2' }} />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {user.role}
                  </Typography>
                </Stack>
                <IconButton
                  aria-label="actions"
                  onClick={e => handleMenuOpen(e, user)}
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
          {selectedUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
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
              label="Rôle"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              fullWidth
              select
              SelectProps={{ native: true }}
            >
              <option value="Agent">Agent</option>
              <option value="Admin">Admin</option>
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
            {selectedUser ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
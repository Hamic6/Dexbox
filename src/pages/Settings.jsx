import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
  Button,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import BusinessIcon from '@mui/icons-material/Business';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Settings() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  const handleSave = () => {
    alert('Paramètres enregistrés (mock) !');
  };

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        maxWidth: 600,
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
        Paramètres
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
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: isDark ? '#222' : '#eee' }}>
            <ListItemIcon>
              <GroupWorkIcon sx={{ color: isDark ? '#fff' : '#111' }} />
            </ListItemIcon>
            <Typography sx={{ fontWeight: 600, ml: 1 }}>Paramètres Groupe</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText primary="Nom du groupe" secondary="Dexbox Group" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Type de groupe" secondary="Agence de voyage" />
              </ListItem>
              {/* Ajoute ici d'autres paramètres groupe */}
            </List>
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ my: 2 }} />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: isDark ? '#222' : '#eee' }}>
            <ListItemIcon>
              <BusinessIcon sx={{ color: isDark ? '#fff' : '#111' }} />
            </ListItemIcon>
            <Typography sx={{ fontWeight: 600, ml: 1 }}>Paramètres Agence</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText primary="Nom de l'agence" secondary="Dexbox RDC" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Adresse" secondary="Kinshasa, RDC" />
              </ListItem>
              {/* Ajoute ici d'autres paramètres agence */}
            </List>
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ my: 2 }} />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: isDark ? '#222' : '#eee' }}>
            <ListItemIcon>
              <ManageAccountsIcon sx={{ color: isDark ? '#fff' : '#111' }} />
            </ListItemIcon>
            <Typography sx={{ fontWeight: 600, ml: 1 }}>Utilisateurs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText primary="Nombre d'utilisateurs" secondary="5 actifs" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Gestion des rôles" secondary="Admin, Agent, Comptable" />
              </ListItem>
              {/* Ajoute ici d'autres paramètres utilisateurs */}
            </List>
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
              color="default"
            />
          }
          label="Recevoir les notifications"
        />
        <FormControlLabel
          control={
            <Switch
              checked={newsletter}
              onChange={e => setNewsletter(e.target.checked)}
              color="default"
            />
          }
          label="Recevoir la newsletter"
        />
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: isDark ? '#222' : '#eee', // Gris foncé en sombre, gris clair en clair
            color: isDark ? '#fff' : '#111',
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: 2,
            mt: 2,
            '&:hover': {
              bgcolor: isDark ? '#333' : '#ddd',
            },
          }}
        >
          Enregistrer
        </Button>
      </Paper>
    </Box>
  );
}
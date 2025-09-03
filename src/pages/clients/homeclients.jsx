import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NoteIcon from '@mui/icons-material/Note';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';

const clientModules = [
  {
    title: 'Identification',
    description: 'Infos générales, civilité, code, adresse, télécom, contacts.',
    icon: <PersonIcon />,
    link: '/clients/identification',
  },
  {
    title: 'Profils',
    description: 'Représentants du client, fonction, anniversaire, télécom.',
    icon: <ContactsIcon />,
    link: '/clients/profils',
  },
  {
    title: 'Agences',
    description: 'Agences de voyage du client, numéro IATA, nom.',
    icon: <BusinessIcon />,
    link: '/clients/agences',
  },
  {
    title: 'Voyageurs',
    description: 'Personnes susceptibles de voyager pour le client.',
    icon: <GroupIcon />,
    link: '/clients/voyageurs',
  },
  {
    title: 'Départements',
    description: 'Regroupement des voyageurs par département, crédit.',
    icon: <ApartmentIcon />,
    link: '/clients/departements',
  },
  {
    title: 'Finances',
    description: 'Comptes, mode de paiement, limite crédit, exonérations, échéance.',
    icon: <AccountBalanceIcon />,
    link: '/clients/finances',
  },
  {
    title: 'Marketing',
    description: 'Offres marketing à transmettre au client.',
    icon: <LocalOfferIcon />,
    link: '/clients/marketing',
  },
  {
    title: 'Remises',
    description: 'Définir les remises sur les produits pour le client.',
    icon: <LocalOfferIcon />,
    link: '/clients/remises',
  },
  {
    title: 'Notes',
    description: 'Informations diverses à conserver sur le client.',
    icon: <NoteIcon />,
    link: '/clients/notes',
  },
  {
    title: 'Compléments',
    description: 'Champs libres personnalisés par l’agence.',
    icon: <SettingsIcon />,
    link: '/clients/complements',
  },
  {
    title: 'Opérations',
    description: 'Ajouter, modifier, supprimer, imprimer, dupliquer, activer/désactiver client/voyageur/département/remise.',
    icon: <AddBoxIcon />,
    link: '/clients/operations',
  },
];

export default function HomeClients() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Clients 
      </Typography>
      <Grid container spacing={3}>
        {clientModules.map((mod) => (
          <Grid item xs={12} sm={6} md={4} key={mod.title}>
            <Card
              elevation={4}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: 6,
                  bgcolor: 'primary.light',
                  color: '#fff',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                minHeight: 160,
              }}
              onClick={() => window.location.href = mod.link}
            >
              <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                {mod.icon}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                {mod.title}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                {mod.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
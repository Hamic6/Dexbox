import { Box, Typography, Grid, Card, Avatar } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';

const modules = [
  {
    title: 'Clients',
    description:
      "Profils Clients, Profils Voyageurs, Bookings, Dossiers, Devis, Factures, Notes de Crédit, Règlements, Remboursements, Relevé Client.",
    icon: <GroupsIcon sx={{ fontSize: 28 }} />,
    color: 'success.main',
    link: '/clients',
  },
  {
    title: 'Fournisseurs',
    description:
      "Profils Fournisseurs, Profils Compagnies, Produits, Règlements au Fournisseur, Rapprochement BSP, Relevé Fournisseur.",
    icon: <BusinessCenterIcon sx={{ fontSize: 28 }} />,
    color: 'warning.main',
    link: '/pricing',
  },
  {
    title: 'Agents',
    description:
      "Profils Agents/Démarcheurs, Règlements à l'Agent, Relevé Agent.",
    icon: <ManageAccountsIcon sx={{ fontSize: 28 }} />,
    color: 'info.main',
    link: '/users',
  },
  {
    title: 'Cash Manager',
    description:
      "Ouvrir/Fermer une Caisse, Consulter le Solde, Transactions Cash, Chèque, Virement, Carte de Crédit, Remises Chèque.",
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />,
    color: 'secondary.main',
    link: '/cash',
  },
  {
    title: 'Comptabilité et Reporting',
    description:
      "Plan Comptable, Journaux, Modèles d'Ecriture, Passerelles Comptables. Ventes, Clients, Fournisseurs, Agents, Caisse, Banque, Liste, Custom Reports.",
    icon: <BarChartIcon sx={{ fontSize: 28 }} />,
    color: 'error.main',
    link: '/reporting',
  },
];

export default function Home() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto' }}>
      <Typography
        variant="h4"
        mb={3}
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
        }}
      >
        Menu principal
      </Typography>
      <Grid container spacing={3}>
        {modules.map((mod, idx) => (
          <Grid item xs={12} sm={6} md={4} key={mod.title}>
            <Card
              elevation={4}
              sx={{
                width: { xs: '90%', sm: 216, md: 216 },
                mx: 'auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 3,
                transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.6s',
                opacity: 0.95,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.04)',
                  boxShadow: 6,
                  opacity: 1,
                  bgcolor: mod.color,
                  color: '#fff',
                },
              }}
              onClick={() => (window.location.href = mod.link)}
            >
              <Avatar sx={{ bgcolor: mod.color, mb: 2, width: 48, height: 48 }}>
                {mod.icon}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center', fontSize: '1rem' }}>
                {mod.title}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem' }}>
                {mod.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
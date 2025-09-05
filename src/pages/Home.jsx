import { Box, Typography, Grid, Card, Avatar } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

const modules = [
  {
    label: 'Clients',
    icon: <GroupsIcon sx={{ fontSize: 28 }} />,
    color: 'success.main',
    link: '/clients/home', // <-- change ici pour pointer vers homeclients.jsx
  },
  {
    label: 'Fournisseurs',
    icon: <BusinessCenterIcon sx={{ fontSize: 28 }} />,
    color: 'warning.main',
    link: '/pricing',
  },
  {
    label: 'Agents',
    icon: <ManageAccountsIcon sx={{ fontSize: 28 }} />,
    color: 'info.main',
    link: '/users',
  },
  {
    label: 'Cash Manager',
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />,
    color: 'secondary.main',
    link: '/cash',
  },
  {
    label: 'Comptabilité et Reporting',
    icon: <BarChartIcon sx={{ fontSize: 28 }} />,
    color: 'error.main',
    link: '/reporting',
  },
];

export default function Home() {
  const navigate = useNavigate();

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
      <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
        {modules.map((mod, idx) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            key={mod.label}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Card
              elevation={4}
              sx={{
                cursor: 'pointer',
                width: 110,
                height: 110,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.08)',
                  boxShadow: 6,
                  bgcolor: 'primary.light',
                  color: '#fff',
                },
              }}
              onClick={() => navigate(mod.link)}
            >
              <Avatar
                sx={{
                  bgcolor: mod.color,
                  width: 48,
                  height: 48,
                  boxShadow: 2,
                }}
              >
                {mod.icon}
              </Avatar>
            </Card>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                textAlign: 'center',
                fontSize: { xs: 14, sm: 15 },
                mt: 1,
                maxWidth: 120,
              }}
            >
              {mod.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
import { AppBar, Toolbar, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import DexboxLogo from '../assets/Dexbox.png';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 'none',
        borderBottom: '1px solid #eee',
        left: 0,
        right: 0,
        top: 0,
        width: '100vw',
        zIndex: 1300,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 48, md: 64 },
          display: 'flex',
          alignItems: 'center',
          px: { xs: 1, md: 6 },
          justifyContent: isMobile ? 'center' : 'flex-start', // centré sur mobile
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: 36, md: 48 },
            height: { xs: 36, md: 48 },
            mr: isMobile ? 0 : 2,
          }}
        >
          <img
            src={DexboxLogo}
            alt="Logo Dexbox"
            title="Dexbox Technologies"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontStyle: 'italic',
            fontFamily: '"ADLaM Display", Montserrat, Arial, sans-serif',
            letterSpacing: 2,
            color: 'primary.main',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.08)',
            opacity: 0.95,
            background: 'linear-gradient(90deg, #ff9800 0%, #1976d2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: { xs: 'none', md: 'inline-block' },
          }}
        >
          Dexbox Technologies <sup style={{ fontSize: '0.45em', verticalAlign: 'super', opacity: 0.7 }}>®</sup>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
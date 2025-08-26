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
        bgcolor: theme.palette.background.paper,
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
          minHeight: isMobile ? 44 : 64, // hauteur réduite sur mobile
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'flex-start', // centré sur mobile
          px: isMobile ? 1 : 6, // padding horizontal réduit sur mobile
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: isMobile ? 32 : 48, // logo plus petit sur mobile
            height: isMobile ? 32 : 48,
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
            color: theme.palette.mode === 'dark' ? '#fff' : '#111',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.08)',
            opacity: 0.95,
            fontSize: isMobile ? '1rem' : '1.25rem', // texte plus petit sur mobile
            display: { xs: 'inline-block', md: 'inline-block' },
            ml: isMobile ? 1 : 2,
          }}
        >
          Dexbox Technologies
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
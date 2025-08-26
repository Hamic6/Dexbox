import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import DexboxLogo from '../assets/Dexbox.png';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useContext } from 'react';
import { ColorModeContext } from '../ColorModeContext'; // adapte le chemin si besoin

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colorMode = useContext(ColorModeContext);

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
          minHeight: isMobile ? 44 : 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'flex-start',
          px: isMobile ? 1 : 6,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: isMobile ? 32 : 48,
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
            fontSize: isMobile ? '1rem' : '1.25rem',
            display: { xs: 'inline-block', md: 'inline-block' },
            ml: isMobile ? 1 : 2,
          }}
        >
          Dexbox Technologies
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          sx={{
            ml: 1,
            color: theme.palette.mode === 'dark' ? '#fff' : '#111',
            bgcolor: theme.palette.mode === 'light' ? '#f5f5f5' : 'transparent',
          }}
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
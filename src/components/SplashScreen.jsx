import { Box, Typography, useTheme } from '@mui/material';
import DexboxLogo from '../assets/Dexbox.png';

export default function SplashScreen() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        bgcolor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: { xs: 90, sm: 120, md: 160 },
          height: { xs: 90, sm: 120, md: 160 },
          mb: 2,
        }}
      >
        <img
          src={DexboxLogo}
          alt="Dexbox Logo"
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          fontStyle: 'italic',
          fontFamily: '"ADLaM Display", Montserrat, Arial, sans-serif',
          letterSpacing: 2,
          color: theme.palette.mode === 'dark' ? '#fff' : '#111',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        Dexbox Technologies
      </Typography>
    </Box>
  );
}
import { Box, Typography, useTheme } from '@mui/material';
import DexboxLogo from '../assets/Dexbox.png';
import { motion } from 'framer-motion';

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
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.05, 1], opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.img
          src={DexboxLogo}
          alt="Dexbox Logo"
          style={{
            width: '100%',
            height: '100%',
            maxWidth: 160,
            maxHeight: 160,
            marginBottom: 16,
            borderRadius: 24,
            background: 'transparent', // logo reste transparent
          }}
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: [0, 10, -10, 0], opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2 }}
        >
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
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 1], y: [20, 0, 0] }}
        transition={{ delay: 2.2, duration: 1.5 }}
        style={{
          marginTop: 32,
          fontSize: 18,
          color: theme.palette.mode === 'dark' ? '#fff' : '#111',
          fontFamily: 'Montserrat, Arial, sans-serif',
          letterSpacing: 1,
          textAlign: 'center',
        }}
      >
        <span>Chargement de votre espace agence...</span>
      </motion.div>
    </Box>
  );
}
import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorMode } from '../ColorModeContext';

const ToggleThemeButton = () => {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      sx={{
        borderRadius: '12px',
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
        color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
        transition: 'all 0.3s ease',
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1400,
        boxShadow: 4,
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0',
        },
      }}
      aria-label="Changer le thème"
    >
      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ToggleThemeButton;
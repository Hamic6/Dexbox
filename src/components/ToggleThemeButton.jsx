import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useContext } from 'react';
import { ColorModeContext } from '../ColorModeContext';

const ToggleThemeButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      sx={{
        borderRadius: '12px',
        backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#fff',
        color: theme.palette.mode === 'dark' ? '#fff' : '#111',
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
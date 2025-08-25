import { useState } from 'react';
import { ThemeProvider, CssBaseline, Fab, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { getTheme } from './theme';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';


function AppContent({ mode, toggleTheme }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {!isLoginPage && <Sidebar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
          {/* Bouton thème en bas à droite, sauf sur login */}
          {!isLoginPage && (
            <Fab
              color="primary"
              aria-label="changer le thème"
              onClick={toggleTheme}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1300,
                boxShadow: 4
              }}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </Fab>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState('light');
  const theme = getTheme(mode);

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent mode={mode} toggleTheme={toggleTheme} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
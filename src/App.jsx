import { CssBaseline } from '@mui/material';
import { ColorModeProvider } from "./ColorModeContext";
import ToggleThemeButton from './components/ToggleThemeButton';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import AvatarMenu from './components/AvatarMenu'; // Ajoute cet import

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Barre du haut avec AvatarMenu */}
      {!isLoginPage && (
        <Box
          sx={{
            width: '100vw', // occupe toute la largeur de la fenêtre
            minHeight: 56, // barre plus fine
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            px: { xs: 2, md: 4 }, // padding responsive
            pt: 0,
            position: 'sticky',
            top: 0,
            zIndex: 1200,
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}
        >
          <AvatarMenu />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {!isLoginPage && <Sidebar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </Box>
      </Box>
      {/* Bouton toggle thème toujours visible sauf sur login */}
      {!isLoginPage && <ToggleThemeButton />}
    </Box>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule un chargement (ex: 1.5s)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <ColorModeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ColorModeProvider>
  );
}

export default App;
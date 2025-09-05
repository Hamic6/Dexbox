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
import AvatarMenu from './components/AvatarMenu';
import Users from './pages/Users';
import Clients from './pages/clients/GestionClients';
import HomeClients from './pages/clients/homeclients';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Terms from './pages/Terms';
import Support from './pages/Support';
import Sales from './pages/Sales';
import AddClient from './pages/clients/add';
import GestionDesVoyageurs from './pages/clients/gestiondesvoyageurs';
import Espaceclient from './pages/Espaceclient';
import BackButton from './components/BackButton';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Bouton retour global */}
      {!isLoginPage && <BackButton />}
      {/* Barre du haut avec AvatarMenu */}
      {!isLoginPage && (
        <Box
          sx={{
            width: '100vw',
            minHeight: 56,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            px: { xs: 2, md: 4 },
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
            <Route path="/users" element={<Users />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/home" element={<HomeClients />} />
            <Route path="/clients/add" element={<AddClient />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/gestiondesvoyageurs" element={<GestionDesVoyageurs />} />
            <Route path="/espaceclient" element={<Espaceclient />} />
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
    const timer = setTimeout(() => setLoading(false), 5000);
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
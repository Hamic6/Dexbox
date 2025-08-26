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

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {!isLoginPage && <Sidebar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 /* arrière-plan supprimé */ }}>
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
import { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, IconButton, useTheme, useMediaQuery, Typography, Card } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import AvatarMenu from './AvatarMenu';
import Tooltip from '@mui/material/Tooltip';
import DexboxLogo from '../assets/Dexbox.png';

const drawerWidth = 200;

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => setOpen(!open);

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card
            elevation={4}
            sx={{
              p: 1, // padding réduit
              mb: 1,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'background.default',
              width: 48, // largeur réduite
              height: 48, // hauteur réduite
              minWidth: 0,
              minHeight: 0,
            }}
          >
            <img
              src={DexboxLogo}
              alt="Logo Dexbox"
              title="Dexbox Technologies"
              style={{ width: 40, height: 40, marginBottom: 4 }}
            />
          </Card>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: '0.55rem',
              fontFamily: '"ADLaM Display", Montserrat, Arial, sans-serif',
              letterSpacing: 2,
              color: theme.palette.secondary.main,
              textTransform: 'uppercase',
              textShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.08)',
              opacity: 0.95,
              background: 'linear-gradient(90deg, #ff9800 0%, #1976d2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              marginTop: 2,
            }}
          >
            Dexbox Technologies <sup style={{ fontSize: '0.45em', verticalAlign: 'super', opacity: 0.7 }}>®</sup>
          </Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/home">
              <ListItemIcon>
                <Tooltip title="Accueil" placement="right">
                  <HomeIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Accueil" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Tableau de bord" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/reservations">
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Réservations" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/clients">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Clients" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ pl: 1, pb: 2, display: 'flex', justifyContent: 'flex-start' }}>
        <AvatarMenu />
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1400 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={handleDrawerToggle}
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
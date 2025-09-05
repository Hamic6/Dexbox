import { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, IconButton, useTheme, useMediaQuery, Typography, Card, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import DexboxLogo from '../assets/Dexbox.png';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LuggageIcon from '@mui/icons-material/Luggage';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShieldIcon from '@mui/icons-material/Security';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 260; // Mets la largeur que tu veux (ex: 260, 300, etc.)

export default function Sidebar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);

  const handleDrawerToggle = () => setOpen(!open);

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto',
        scrollbarColor: isDark ? '#444 #111' : '#ccc #fff',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: 8,
        },
        '&::-webkit-scrollbar-thumb': {
          background: isDark ? '#444' : '#ccc',
          borderRadius: 8,
        },
        '&::-webkit-scrollbar-track': {
          background: isDark ? '#111' : '#fff',
        },
      }}
    >
      <Box>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={DexboxLogo}
            alt="Logo Dexbox"
            title="Dexbox Technologies"
            style={{ width: 142, height: 142, marginBottom: 8 }} // Taille doublée et margin ajusté
          />
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
            <ListItemButton component={Link} to="/sales">
              <ListItemIcon>
                <StorefrontIcon /> {/* Icône "Espace ventes" plus adaptée */}
              </ListItemIcon>
              <ListItemText primary="Espace ventes" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/pricing">
              <ListItemIcon>
                <BusinessCenterIcon /> {/* Icône "Espace Fournisseur" plus adaptée */}
              </ListItemIcon>
              <ListItemText primary="Espace Fournisseur" />
            </ListItemButton>
          </ListItem>
          
         
          <Collapse in={clientsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/clients">
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestion des clients" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/gestiondesvoyageurs">
                  <ListItemIcon>
                    <FlightTakeoffIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestion des voyageurs" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/espaceclient">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Espace client" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <List sx={{ mb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/users">
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Espace Agent" />
          </ListItemButton>
        </ListItem>
      </List>
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
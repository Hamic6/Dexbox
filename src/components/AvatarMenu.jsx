import { Avatar, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setAnchorEl(null);
    navigate('/login');
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handleSettings = () => {
    setAnchorEl(null);
    navigate('/settings');
  };

  const handleTerms = () => {
    setAnchorEl(null);
    navigate('/terms');
  };

  const handleSupport = () => {
    setAnchorEl(null);
    navigate('/support');
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ ml: 1 }}>
        <Avatar alt="Agent" src="" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profil
        </MenuItem>
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Paramètres
        </MenuItem>
        <MenuItem onClick={handleTerms}>
          <ListItemIcon>
            <GavelIcon fontSize="small" />
          </ListItemIcon>
          Conditions d'utilisation
        </MenuItem>
        <MenuItem onClick={handleSupport}>
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
          Assistance
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Déconnexion
        </MenuItem>
      </Menu>
    </>
  );
}
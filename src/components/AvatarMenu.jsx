import { Avatar, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';
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

  return (
    <>
      <IconButton onClick={handleClick} sx={{ ml: 1 }}>
        <Avatar alt="Agent" src="" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profil
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Paramètres
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
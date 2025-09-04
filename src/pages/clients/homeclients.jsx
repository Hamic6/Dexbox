import React from 'react';
import { Box, Typography, Grid, Card, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useNavigate } from 'react-router-dom';

export default function HomeClients() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Clients
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={2}>
          <Card
            elevation={4}
            sx={{
              cursor: 'pointer',
              width: { xs: '50%', sm: 108, md: 108 },
              mx: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              minHeight: 90,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: 6,
                bgcolor: 'primary.light',
                color: '#fff',
              },
            }}
            onClick={() => navigate('/clients/add')}
          >
            <Avatar sx={{ bgcolor: 'primary.main', mb: 1, width: 40, height: 40 }}>
              <PersonAddIcon sx={{ fontSize: 24 }} />
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'center' }}>
              Ajouter un client
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Card
            elevation={4}
            sx={{
              cursor: 'pointer',
              width: { xs: '50%', sm: 108, md: 108 },
              mx: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              minHeight: 90,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: 6,
                bgcolor: 'primary.light',
                color: '#fff',
              },
            }}
            onClick={() => navigate('/clients')}
          >
            <Avatar sx={{ bgcolor: 'success.main', mb: 1, width: 40, height: 40 }}>
              <GroupsIcon sx={{ fontSize: 24 }} />
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'center' }}>
              Gestion des clients
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Card
            elevation={4}
            sx={{
              cursor: 'pointer',
              width: { xs: '50%', sm: 108, md: 108 },
              mx: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              minHeight: 90,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: 6,
                bgcolor: 'primary.light',
                color: '#fff',
              },
            }}
            onClick={() => navigate('/gestiondesvoyageurs')}
          >
            <Avatar sx={{ bgcolor: 'info.main', mb: 1, width: 40, height: 40 }}>
              <FlightTakeoffIcon sx={{ fontSize: 24 }} />
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'center' }}>
              Gestion des voyageurs
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
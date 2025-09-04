import React from 'react';
import { Box, Typography, Grid, Card, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DiscountIcon from '@mui/icons-material/Discount';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    label: 'Ajouter un client',
    icon: <PersonAddIcon sx={{ fontSize: 28 }} />,
    color: 'primary.main',
    to: '/clients/add',
  },
  {
    label: 'Gestion des clients',
    icon: <GroupsIcon sx={{ fontSize: 28 }} />,
    color: 'success.main',
    to: '/clients',
  },
  {
    label: 'Gestion des voyageurs',
    icon: <FlightTakeoffIcon sx={{ fontSize: 28 }} />,
    color: 'info.main',
    to: '/gestiondesvoyageurs',
  },
  {
    label: 'Agences',
    icon: <BusinessIcon sx={{ fontSize: 28 }} />,
    color: 'warning.main',
    to: '/agences',
  },
  {
    label: 'Départements',
    icon: <ApartmentIcon sx={{ fontSize: 28 }} />,
    color: 'secondary.main',
    to: '/departements',
  },
  {
    label: 'Rémises',
    icon: <DiscountIcon sx={{ fontSize: 28 }} />,
    color: 'error.main',
    to: '/remises',
  },
];

export default function HomeClients() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Clients
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        alignItems="flex-start"
      >
        {cards.map((card, idx) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            key={card.label}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Card
              elevation={4}
              sx={{
                cursor: 'pointer',
                width: 110,
                height: 110,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.08)',
                  boxShadow: 6,
                  bgcolor: 'primary.light',
                  color: '#fff',
                },
              }}
              onClick={() => navigate(card.to)}
            >
              <Avatar
                sx={{
                  bgcolor: card.color,
                  width: 48,
                  height: 48,
                  boxShadow: 2,
                }}
              >
                {card.icon}
              </Avatar>
            </Card>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                textAlign: 'center',
                fontSize: { xs: 14, sm: 15 },
                mt: 1,
                maxWidth: 120,
              }}
            >
              {card.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
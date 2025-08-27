import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function Home() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto' }}>
      <Typography
        variant="h4"
        mb={3}
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
        }}
      >
        Bienvenue sur l’application Agence Voyage !
      </Typography>
      <Typography
        variant="body1"
        mb={4}
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: { xs: '1rem', md: '1.1rem' },
        }}
      >
        Découvrez tout ce que notre plateforme peut faire pour vous :
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={4}
            sx={{
              width: { xs: '90%', sm: 216, md: 216 },
              mx: 'auto',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 3,
              transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.6s',
              opacity: 0.95,
              '&:hover': {
                transform: 'translateY(-8px) scale(1.04)',
                boxShadow: 6,
                opacity: 1,
              },
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 48, height: 48 }}>
              <BeachAccessIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center', fontSize: '1rem' }}>
              Conseil personnalisé
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem' }}>
              Choisissez la destination, la période idéale et le type de séjour (plage, aventure, culturel…) selon vos envies.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={4}
            sx={{
              width: { xs: '90%', sm: 216, md: 216 },
              mx: 'auto',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 3,
              transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.6s',
              opacity: 0.95,
              '&:hover': {
                transform: 'translateY(-8px) scale(1.04)',
                boxShadow: 6,
                opacity: 1,
              },
            }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main', mb: 2, width: 48, height: 48 }}>
              <FlightTakeoffIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center', fontSize: '1rem' }}>
              Réservation simplifiée
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem' }}>
              Billets d’avion, hôtels, locations de voiture, croisières, excursions… tout est pris en charge pour vous.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={4}
            sx={{
              width: { xs: '90%', sm: 216, md: 216 },
              mx: 'auto',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 3,
              transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.6s',
              opacity: 0.95,
              '&:hover': {
                transform: 'translateY(-8px) scale(1.04)',
                boxShadow: 6,
                opacity: 1,
              },
            }}
          >
            <Avatar sx={{ bgcolor: 'success.main', mb: 2, width: 48, height: 48 }}>
              <LocalOfferIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center', fontSize: '1rem' }}>
              Création de packages
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem' }}>
              Profitez de formules tout compris (vol + hôtel + activités) à des tarifs négociés et avantageux.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={4}
            sx={{
              width: { xs: '90%', sm: 216, md: 216 },
              mx: 'auto',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 3,
              transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.6s',
              opacity: 0.95,
              '&:hover': {
                transform: 'translateY(-8px) scale(1.04)',
                boxShadow: 6,
                opacity: 1,
              },
            }}
          >
            <Avatar sx={{ bgcolor: 'error.main', mb: 2, width: 48, height: 48 }}>
              <SupportAgentIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center', fontSize: '1rem' }}>
              Assistance dédiée
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem' }}>
              En cas de problème (annulation, retard, perte de bagages), notre équipe intervient pour vous aider rapidement.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
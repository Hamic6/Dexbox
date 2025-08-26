import { useTheme, useMediaQuery, Container, Box, Grid, Typography, TextField, Button, InputAdornment, IconButton, Card } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import loginIllustration from '../assets/login-illustration.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
    setError('');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (
      formData.email === 'agent@agence.com' &&
      formData.password === '123456'
    ) {
      navigate('/home'); // Redirection vers la page d'accueil
    } else {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <>
      <Navbar />
      <Container 
        maxWidth="lg" 
        disableGutters 
        sx={{ 
          pt: { xs: 0, md: 1 },
          px: { xs: 0, md: 2 }
        }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            py: { xs: 2, md: 0 }
          }}
        >
          <Grid
            container
            spacing={{ xs: 0, md: 6, lg: 12 }}
            alignItems="center"
            justifyContent="center"
            sx={{ 
              minHeight: { xs: 'auto', md: '100vh' },
              width: '100%',
              m: 0
            }}
          >
            {/* Illustration à gauche, masquée sur mobile */}
            {!isMobile && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: { xs: 2, md: 0 }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={loginIllustration}
                    alt="Illustration"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '16px',
                    }}
                  />
                </Box>
              </Grid>
            )}

            {/* Section connexion responsive */}
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                display: 'flex', 
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: 'center',
                p: { xs: 2, md: 0 }
              }}
            >
              <Card
                elevation={isMobile ? 0 : 8}
                sx={{
                  width: '100%',
                  maxWidth: 450,
                  p: { xs: 3, sm: 4 },
                  borderRadius: { xs: 0, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  boxShadow: { xs: 'none', md: '0 8px 32px rgba(0,0,0,0.08)' },
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    fontSize: { xs: '0.85rem', md: '1.1rem' }, // taille réduite
                    textAlign: 'center',
                    mb: 0.5,
                  }}
                >
                  Connectez-vous à votre compte
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    fontSize: { xs: '0.65rem', md: '0.8rem' }, // taille réduite
                    textAlign: 'center',
                  }}
                >
                  Vous n'avez pas de compte?{' '}
                  <Box
                    component="span"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      ml: 0.5,
                      transition: 'color 0.2s',
                      fontSize: { xs: '0.65rem', md: '0.8rem' }, // taille réduite
                      '&:hover': { color: 'primary.dark' },
                    }}
                    onClick={() => alert('Redirection vers la page d\'inscription')}
                  >
                    Créer un compte
                  </Box>
                </Typography>
                
                <Box 
                  component="form" 
                  onSubmit={handleSubmit} 
                  sx={{ 
                    width: '100%', 
                    mt: 1 
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresse email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleChange('email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: 'grey.700', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      mb: 1,
                      '& .MuiInputBase-root': {
                        height: { xs: 24, md: 32 }, // hauteur réduite
                        fontSize: { xs: '0.7rem', md: '0.85rem' }, // taille réduite
                        bgcolor: '#fff', // couleur de fond normale
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: { xs: '0.7rem', md: '0.85rem' },
                      },
                    }}
                  />
                  
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: 'grey.700', fontSize: 16 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff sx={{ fontSize: 16 }} /> : <Visibility sx={{ fontSize: 16 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      mb: 0.5,
                      '& .MuiInputBase-root': {
                        height: { xs: 24, md: 32 }, // hauteur réduite
                        fontSize: { xs: '0.7rem', md: '0.85rem' }, // taille réduite
                        bgcolor: '#fff', // couleur de fond normale
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: { xs: '0.7rem', md: '0.85rem' },
                      },
                    }}
                  />
                  
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                      mt: 1,
                      textAlign: 'right',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      textDecoration: 'underline',
                      fontSize: '0.9rem',
                      '&:hover': { color: 'primary.dark' },
                    }}
                    onClick={() => alert('Redirection vers la page de récupération')}
                  >
                    Mot de passe oublié?
                  </Typography>
                  
                  {error && (
                    <Typography 
                      variant="body2" 
                      color="error" 
                      sx={{ 
                        mt: 2,
                        textAlign: 'center',
                        fontWeight: 500
                      }}
                    >
                      {error}
                    </Typography>
                  )}
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 3,
                      py: 0.3, // padding vertical réduit
                      borderRadius: 2,
                      fontWeight: 'bold',
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      fontSize: { xs: '0.6rem', md: '0.75rem' }, // taille du texte réduite
                      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
                      textTransform: 'none',
                      height: { xs: 30, md: 48 }, // hauteur réduite
                    }}
                  >
                    Se connecter
                  </Button>
                </Box>
                
                <Box sx={{ width: '100%', mt: 4 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      textAlign: 'center', 
                      mb: 2,
                      fontSize: '0.9rem'
                    }}
                  >
                    Ou connectez-vous avec
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}>
                    <Button
                      variant="outlined"
                      startIcon={<Google />}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        fontWeight: 500,
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        color: '#4285F4',
                        borderColor: '#e0e0e0',
                        height: 44,
                        px: 2,
                        fontSize: '0.9rem',
                        '&:hover': { 
                          borderColor: '#4285F4', 
                          background: 'rgba(66,133,244,0.04)' 
                        },
                      }}
                    >
                      Google
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<Facebook />}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        fontWeight: 500,
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        color: '#1877F3',
                        borderColor: '#e0e0e0',
                        height: 44,
                        px: 2,
                        fontSize: '0.9rem',
                        '&:hover': { 
                          borderColor: '#1877F3', 
                          background: 'rgba(24,119,243,0.04)' 
                        },
                      }}
                    >
                      Facebook
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
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

            {/* Section connexion responsive - MODIFICATIONS APPLIQUÉES ICI */}
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
                  maxWidth: { xs: '100%', sm: 400, md: 450 },
                  p: { xs: 3, sm: 4 },
                  borderRadius: { xs: 0, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: theme.palette.background.paper,
                  boxShadow: { xs: 'none', md: '0 8px 32px rgba(0,0,0,0.08)' },
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    textAlign: 'center',
                    mb: 1,
                    color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                  }}
                >
                  Connectez-vous à votre compte
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    textAlign: 'center',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                  }}
                >
                  Vous n'avez pas de compte?{' '}
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      ml: 0.5,
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      '&:hover': { opacity: 0.7 },
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
                    mt: 1,
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
                          <Email sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#111', fontSize: { xs: 18, md: 20 } }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      mb: 2,
                      '& .MuiInputBase-root': {
                        height: { xs: 48, md: 56 },
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        color: theme.palette.mode === 'dark' ? '#fff' : '#111',
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
                          <Lock sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#111', fontSize: { xs: 18, md: 20 } }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            size="small"
                            sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#111' }}
                          >
                            {showPassword ? <VisibilityOff sx={{ fontSize: { xs: 18, md: 20 } }} /> : <Visibility sx={{ fontSize: { xs: 18, md: 20 } }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      mb: 1,
                      '& .MuiInputBase-root': {
                        height: { xs: 48, md: 56 },
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      textAlign: 'right',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      textDecoration: 'underline',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                      '&:hover': { opacity: 0.7 },
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
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                      }}
                    >
                      {error}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      textTransform: 'none',
                      height: { xs: 48, md: 56 },
                      bgcolor: theme.palette.mode === 'dark' ? '#111' : '#fff',
                      color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? '#fff' : '#111',
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? '#222' : '#f5f5f5',
                      },
                    }}
                  >
                    Se connecter
                  </Button>
                </Box>
                <Box sx={{ width: '100%', mt: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'center',
                      mb: 2,
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                    }}
                  >
                    Ou connectez-vous avec
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 2,
                      flexDirection: { xs: 'column', sm: 'row' },
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<Google sx={{ fontSize: { xs: 18, md: 20 }, color: theme.palette.mode === 'dark' ? '#fff' : '#111' }} />}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        fontWeight: 500,
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                        borderColor: theme.palette.mode === 'dark' ? '#fff' : '#111',
                        height: { xs: 40, md: 48 },
                        px: 2,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        bgcolor: theme.palette.background.paper,
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' ? '#222' : '#f5f5f5',
                          borderColor: theme.palette.mode === 'dark' ? '#fff' : '#111',
                        },
                      }}
                    >
                      Google
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Facebook sx={{ fontSize: { xs: 18, md: 20 }, color: theme.palette.mode === 'dark' ? '#fff' : '#111' }} />}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        fontWeight: 500,
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        color: theme.palette.mode === 'dark' ? '#fff' : '#111',
                        borderColor: theme.palette.mode === 'dark' ? '#fff' : '#111',
                        height: { xs: 40, md: 48 },
                        px: 2,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        bgcolor: theme.palette.background.paper,
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' ? '#222' : '#f5f5f5',
                          borderColor: theme.palette.mode === 'dark' ? '#fff' : '#111',
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
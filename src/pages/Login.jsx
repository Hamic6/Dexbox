import { useTheme, useMediaQuery, Container, Box, Grid, Typography, TextField, Button, InputAdornment, IconButton, Card } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import loginIllustration from '../assets/login-illustration.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
      <Container maxWidth="lg" disableGutters sx={{ pt: { xs: 0.5, md: 1 } }}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
          }}
        >
          <Grid
            container
            spacing={{ xs: 0, md: 12 }}
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
          >
            {/* Illustration à gauche, masquée sur mobile */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: '88%', // +5% d'agrandissement
                  maxWidth: 617, // +5% d'agrandissement
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <img
                  src={loginIllustration}
                  alt="Illustration"
                  style={{
                    width: '100%',
                    maxHeight: 529, // +5% d'agrandissement
                    objectFit: 'contain',
                    borderRadius: '16px',
                    zIndex: 2,
                    position: 'relative',
                  }}
                />
              </Box>
            </Grid>
            {/* Section connexion responsive */}
            <Grid item xs={12} md={6}>
              {isMobile ? (
                <Box
                  sx={{
                    width: '100vw',
                    minHeight: 'calc(100vh - 56px)', // occupe tout l'espace sous le navbar
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    pt: 4,
                    px: 2,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography
                    variant="h5"
                    color="primary"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      letterSpacing: 0.5,
                      fontSize: '1.2rem',
                      mt: 2,
                    }}
                  >
                    Sign in to your account
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      fontSize: '0.95rem',
                      textAlign: 'center',
                    }}
                  >
                    Don’t have an account?{' '}
                    <Box
                      component="span"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        ml: 0.5,
                        transition: 'color 0.2s',
                        '&:hover': { color: 'primary.dark' },
                      }}
                      onClick={() => alert('Redirection vers la page d’inscription')}
                    >
                      Get started
                    </Box>
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={formData.email}
                      onChange={handleChange('email')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: 'grey.700' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        mb: 1,
                        height: 38,
                        '& .MuiInputBase-root': { height: 38 },
                        fontSize: '0.95rem',
                      }}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange('password')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: 'grey.700' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        mb: 1,
                        height: 38,
                        '& .MuiInputBase-root': { height: 38 },
                        fontSize: '0.95rem',
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
                        fontSize: '0.95rem',
                        '&:hover': { color: 'primary.dark' },
                      }}
                      onClick={() => alert('Redirection vers la page de récupération')}
                    >
                      Forgot password?
                    </Typography>
                    {error && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
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
                        py: 0.8,
                        borderRadius: 2,
                        fontWeight: 'bold',
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 16px rgba(25, 118, 210, 0.08)',
                        textTransform: 'none',
                        height: 38,
                      }}
                    >
                      Sign in
                    </Button>
                  </Box>
                  <Box sx={{ width: '100%', mt: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
                      Or sign in with
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Google />}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          fontWeight: 500,
                          fontFamily: 'Inter, Roboto, Arial, sans-serif',
                          color: '#4285F4',
                          borderColor: '#4285F4',
                          height: 34,
                          px: 2,
                          fontSize: '0.9rem',
                          '&:hover': { borderColor: '#4285F4', background: 'rgba(66,133,244,0.08)' },
                        }}
                      >
                        Gmail
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
                          borderColor: '#1877F3',
                          height: 34,
                          px: 2,
                          fontSize: '0.9rem',
                          '&:hover': { borderColor: '#1877F3', background: 'rgba(24,119,243,0.08)' },
                        }}
                      >
                        Facebook
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <Card
                    elevation={8}
                    sx={{
                      maxWidth: 400,
                      width: '100%',
                      p: 2,
                      borderRadius: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      bgcolor: 'background.paper',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      mt: { xs: 8, md: 10 },
                    }}
                  >
                    <Typography
                      variant="h5"
                      color="primary"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        letterSpacing: 0.5,
                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                      }}
                    >
                      Sign in to your account
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontFamily: 'Inter, Roboto, Arial, sans-serif',
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        textAlign: 'center',
                      }}
                    >
                      Don’t have an account?{' '}
                      <Box
                        component="span"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          ml: 0.5,
                          transition: 'color 0.2s',
                          '&:hover': { color: 'primary.dark' },
                        }}
                        onClick={() => alert('Redirection vers la page d’inscription')}
                      >
                        Get started
                      </Box>
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange('email')}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: 'grey.700' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          fontFamily: 'Inter, Roboto, Arial, sans-serif',
                          mb: 1,
                          height: { xs: 38, md: 44 },
                          '& .MuiInputBase-root': { height: { xs: 38, md: 44 } },
                          fontSize: { xs: '0.95rem', md: '1rem' },
                        }}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: 'grey.700' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          fontFamily: 'Inter, Roboto, Arial, sans-serif',
                          mb: 1,
                          height: { xs: 38, md: 44 },
                          '& .MuiInputBase-root': { height: { xs: 38, md: 44 } },
                          fontSize: { xs: '0.95rem', md: '1rem' },
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
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          '&:hover': { color: 'primary.dark' },
                        }}
                        onClick={() => alert('Redirection vers la page de récupération')}
                      >
                        Forgot password?
                      </Typography>
                      {error && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
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
                          py: { xs: 0.8, md: 1.2 },
                          borderRadius: 2,
                          fontWeight: 'bold',
                          fontFamily: 'Inter, Roboto, Arial, sans-serif',
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          boxShadow: '0 4px 16px rgba(25, 118, 210, 0.08)',
                          textTransform: 'none',
                          height: { xs: 38, md: 44 },
                        }}
                      >
                        Sign in
                      </Button>
                    </Box>
                    <Box sx={{ width: '100%', mt: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
                        Or sign in with
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                          variant="outlined"
                          startIcon={<Google />}
                          sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            fontWeight: 500,
                            fontFamily: 'Inter, Roboto, Arial, sans-serif',
                            color: '#4285F4',
                            borderColor: '#4285F4',
                            height: { xs: 34, md: 40 },
                            px: 2,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&:hover': { borderColor: '#4285F4', background: 'rgba(66,133,244,0.08)' },
                          }}
                        >
                          Gmail
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
                            borderColor: '#1877F3',
                            height: { xs: 34, md: 40 },
                            px: 2,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            '&:hover': { borderColor: '#1877F3', background: 'rgba(24,119,243,0.08)' },
                          }}
                        >
                          Facebook
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
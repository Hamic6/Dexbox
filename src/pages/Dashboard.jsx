import {
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Stack,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import PersonIcon from '@mui/icons-material/Person';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Mock data
const stats = [
  { label: 'Clients', value: 128, icon: <PersonIcon /> },
  { label: 'Réservations', value: 54, icon: <FlightTakeoffIcon /> },
  { label: 'Packages', value: 12, icon: <LocalOfferIcon /> },
  { label: 'Assistance', value: 5, icon: <SupportAgentIcon /> },
];

const bookings = [
  { client: 'Alice', destination: 'Paris', date: '2025-08-27', status: 'Confirmée' },
  { client: 'Bob', destination: 'Rome', date: '2025-08-28', status: 'En attente' },
  { client: 'Charlie', destination: 'Tokyo', date: '2025-08-29', status: 'Confirmée' },
  { client: 'Diana', destination: 'New York', date: '2025-08-30', status: 'Annulée' },
  { client: 'Eve', destination: 'Sydney', date: '2025-08-31', status: 'Confirmée' },
];

const barData = [
  { month: 'Jan', reservations: 20 },
  { month: 'Fév', reservations: 35 },
  { month: 'Mar', reservations: 30 },
  { month: 'Avr', reservations: 40 },
  { month: 'Mai', reservations: 25 },
  { month: 'Juin', reservations: 50 },
];

const pieData = [
  { id: 0, value: 40, label: 'Plage' },
  { id: 1, value: 30, label: 'Aventure' },
  { id: 2, value: 20, label: 'Culturel' },
  { id: 3, value: 10, label: 'Croisière' },
];

const lineData = [
  { x: 1, y: 10 },
  { x: 2, y: 20 },
  { x: 3, y: 15 },
  { x: 4, y: 30 },
  { x: 5, y: 25 },
  { x: 6, y: 35 },
];

export default function Dashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        maxWidth: 1400,
        mx: 'auto',
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: { xs: 'center', md: 'left' },
          mb: 2,
          color: isDark ? '#fff' : '#111',
        }}
      >
        Tableau de bord
      </Typography>
      <Alert
        severity="info"
        sx={{
          mb: 3,
          borderRadius: 2,
          boxShadow: 1,
          bgcolor: isDark ? '#222' : '#fff',
          color: isDark ? '#fff' : '#111',
          border: '1px solid',
          borderColor: isDark ? '#fff' : '#111',
        }}
      >
        Mode démo : Les données sont fictives et illustrent les fonctionnalités du tableau de bord.
      </Alert>
      <Grid container spacing={2} mb={2}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card
              elevation={3}
              sx={{
                p: { xs: 1, md: 2 },
                minHeight: { xs: 90, md: 120 },
                bgcolor: isDark ? '#111' : '#fff',
                color: isDark ? '#fff' : '#111',
                borderRadius: 3,
                boxShadow: 2,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: 6,
                },
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 36, md: 44 },
                  height: { xs: 36, md: 44 },
                  mb: 1,
                  bgcolor: isDark ? '#222' : '#eee',
                  color: isDark ? '#fff' : '#111',
                }}
              >
                {stat.icon}
              </Avatar>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                {stat.label}
              </Typography>
              <Typography variant="h5" sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: { xs: 1, md: 2 },
              borderRadius: 3,
              bgcolor: isDark ? '#111' : '#fff',
              color: isDark ? '#fff' : '#111',
              boxShadow: 2,
              mb: 2,
            }}
          >
            <BarChart
              xAxis={[{ scaleType: 'band', data: barData.map(d => d.month) }]}
              series={[{ data: barData.map(d => d.reservations) }]}
              width={undefined}
              height={180}
              sx={{ width: '100%' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: { xs: 1, md: 2 },
              borderRadius: 3,
              bgcolor: isDark ? '#111' : '#fff',
              color: isDark ? '#fff' : '#111',
              boxShadow: 2,
              mb: 2,
            }}
          >
            <PieChart
              series={[{ data: pieData }]}
              width={undefined}
              height={180}
              sx={{ width: '100%' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: { xs: 1, md: 2 },
              borderRadius: 3,
              bgcolor: isDark ? '#111' : '#fff',
              color: isDark ? '#fff' : '#111',
              boxShadow: 2,
              mb: 2,
            }}
          >
            <LineChart
              xAxis={[{ data: lineData.map(d => d.x) }]}
              series={[{ data: lineData.map(d => d.y) }]}
              width={undefined}
              height={180}
              sx={{ width: '100%' }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Paper
        sx={{
          p: { xs: 1, md: 2 },
          overflowX: 'auto',
          borderRadius: 3,
          boxShadow: 2,
          bgcolor: isDark ? '#111' : '#fff',
          color: isDark ? '#fff' : '#111',
          mb: 2,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Dernières réservations
          </Typography>
          <IconButton>
            <MoreVertIcon sx={{ color: isDark ? '#fff' : '#111' }} />
          </IconButton>
        </Stack>
        <TableContainer sx={{ minWidth: 320 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: isDark ? '#222' : '#fafafa' }}>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Client</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Destination</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Date</TableCell>
                <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((row, idx) => (
                <TableRow key={idx} sx={{ bgcolor: idx % 2 ? (isDark ? '#181818' : '#f5f5f5') : 'inherit' }}>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.client}</TableCell>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.destination}</TableCell>
                  <TableCell sx={{ color: isDark ? '#fff' : '#111' }}>{row.date}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        row.status === 'Confirmée'
                          ? (isDark ? '#4caf50' : '#388e3c')
                          : row.status === 'Annulée'
                          ? (isDark ? '#f44336' : '#d32f2f')
                          : (isDark ? '#ff9800' : '#f57c00'),
                      fontWeight: 600,
                    }}
                  >
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: isDark ? '#fff' : '#111',
            color: isDark ? '#111' : '#fff',
            fontWeight: 700,
            borderRadius: 2,
            px: 4,
            py: 1,
            boxShadow: 2,
            '&:hover': {
              bgcolor: isDark ? '#eee' : '#222',
            },
          }}
        >
          Voir toutes les réservations
        </Button>
      </Box>
    </Box>
  );
}


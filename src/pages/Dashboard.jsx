import { Box, Typography, Stack } from '@mui/material';
import DashboardCard from '../components/DashboardCard';
import mockBookings from '../mocks/mockBookings';

export default function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Tableau de bord - Agent de voyage
      </Typography>
      <Stack direction="row" spacing={4}>
        <DashboardCard title="Réservations du jour" count={mockBookings.today.length} />
        <DashboardCard title="Clients actifs" count={mockBookings.clients.length} />
        <DashboardCard title="Factures en attente" count={mockBookings.pendingInvoices.length} />
      </Stack>
    </Box>
  );
}
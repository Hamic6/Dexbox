import { Paper, Typography } from '@mui/material';

export default function DashboardCard({ title, count }) {
  return (
    <Paper elevation={3} sx={{ p: 3, minWidth: 180, textAlign: 'center' }}>
      <Typography variant="h6" mb={1}>
        {title}
      </Typography>
      <Typography variant="h4" color="primary">
        {count}
      </Typography>
    </Paper>
  );
}
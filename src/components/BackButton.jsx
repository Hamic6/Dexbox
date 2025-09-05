import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Tooltip } from '@mui/material';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Tooltip title="Retour">
      <IconButton
        color="primary"
        onClick={() => navigate(-1)}
        sx={{
          position: 'fixed',
          bottom: { xs: 64, md: 24 }, // <-- 64px sur mobile, 24px sur desktop
          left: { xs: 24, md: 260 },
          zIndex: 2000,
          bgcolor: 'background.paper',
          boxShadow: 2,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
}
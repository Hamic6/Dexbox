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
          bottom: 24,
          left: { xs: 24, md: 260 }, // 24px sur mobile, 260px sur desktop (largeur sidebar)
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
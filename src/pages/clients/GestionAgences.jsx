import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GestionAgences() {
  const [agences, setAgences] = useState([
    { id: 1, nom: 'Agence Paris', iata: '12345678' },
    { id: 2, nom: 'Agence Lyon', iata: '87654321' },
  ]);
  const [newAgence, setNewAgence] = useState({ nom: '', iata: '' });

  const handleAdd = () => {
    if (newAgence.nom && newAgence.iata) {
      setAgences([
        ...agences,
        { ...newAgence, id: Date.now() }
      ]);
      setNewAgence({ nom: '', iata: '' });
    }
  };

  const handleDelete = (id) => {
    setAgences(agences.filter(a => a.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Gestion des agences</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Nom de l'agence"
            value={newAgence.nom}
            onChange={e => setNewAgence(a => ({ ...a, nom: e.target.value }))}
            size="small"
          />
          <TextField
            label="Numéro IATA"
            value={newAgence.iata}
            onChange={e => setNewAgence(a => ({ ...a, iata: e.target.value }))}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            disabled={!newAgence.nom || !newAgence.iata}
          >
            Ajouter
          </Button>
        </Stack>
      </Paper>
      {agences.map(agence => (
        <Paper key={agence.id} sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{agence.nom} — IATA : {agence.iata}</span>
          <IconButton color="error" onClick={() => handleDelete(agence.id)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
}
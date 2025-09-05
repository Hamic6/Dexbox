import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GestionDepartements() {
  const [departements, setDepartements] = useState([
    { id: 1, nom: 'Commercial', creditLimite: 10000 },
    { id: 2, nom: 'Marketing', creditLimite: 5000 },
  ]);
  const [newDep, setNewDep] = useState({ nom: '', creditLimite: '' });

  const handleAdd = () => {
    if (newDep.nom && newDep.creditLimite) {
      setDepartements([
        ...departements,
        { ...newDep, id: Date.now() }
      ]);
      setNewDep({ nom: '', creditLimite: '' });
    }
  };

  const handleDelete = (id) => {
    setDepartements(departements.filter(d => d.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Gestion des départements</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Nom du département"
            value={newDep.nom}
            onChange={e => setNewDep(d => ({ ...d, nom: e.target.value }))}
            size="small"
          />
          <TextField
            label="Crédit limite"
            type="number"
            value={newDep.creditLimite}
            onChange={e => setNewDep(d => ({ ...d, creditLimite: e.target.value }))}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            disabled={!newDep.nom || !newDep.creditLimite}
          >
            Ajouter
          </Button>
        </Stack>
      </Paper>
      {departements.map(dep => (
        <Paper key={dep.id} sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{dep.nom} — Crédit limite : {dep.creditLimite} €</span>
          <IconButton color="error" onClick={() => handleDelete(dep.id)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
}
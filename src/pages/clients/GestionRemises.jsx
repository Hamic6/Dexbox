import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack, MenuItem, Select, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { remisesOptions as initialRemises } from '../../mocks/mockRemises';

export default function GestionRemises() {
  const [remises, setRemises] = useState(initialRemises);
  const [newRemise, setNewRemise] = useState({
    label: '',
    type: 'pourcentage',
    valeur: '',
    cible: 'global',
    conditions: '',
  });

  const handleAdd = () => {
    if (newRemise.label && newRemise.valeur) {
      setRemises([
        ...remises,
        { ...newRemise, id: Date.now() }
      ]);
      setNewRemise({ label: '', type: 'pourcentage', valeur: '', cible: 'global', conditions: '' });
    }
  };

  const handleDelete = (id) => {
    setRemises(remises.filter(r => r.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>Gestion des remises</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Nom de la remise"
            value={newRemise.label}
            onChange={e => setNewRemise(r => ({ ...r, label: e.target.value }))}
            size="small"
          />
          <Select
            value={newRemise.type}
            onChange={e => setNewRemise(r => ({ ...r, type: e.target.value }))}
            size="small"
          >
            <MenuItem value="pourcentage">%</MenuItem>
            <MenuItem value="montant">€</MenuItem>
          </Select>
          <TextField
            label={newRemise.type === 'pourcentage' ? 'Pourcentage' : 'Montant'}
            type="number"
            value={newRemise.valeur}
            onChange={e => setNewRemise(r => ({ ...r, valeur: e.target.value }))}
            size="small"
            sx={{ width: 100 }}
          />
          <Select
            value={newRemise.cible}
            onChange={e => setNewRemise(r => ({ ...r, cible: e.target.value }))}
            size="small"
          >
            <MenuItem value="global">Global</MenuItem>
            <MenuItem value="vol">Vol</MenuItem>
            <MenuItem value="hotel">Hôtel</MenuItem>
            <MenuItem value="departement">Département</MenuItem>
            <MenuItem value="voyageur">Voyageur</MenuItem>
          </Select>
          <TextField
            label="Conditions"
            value={newRemise.conditions}
            onChange={e => setNewRemise(r => ({ ...r, conditions: e.target.value }))}
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            disabled={!newRemise.label || !newRemise.valeur}
          >
            Ajouter
          </Button>
        </Stack>
      </Paper>
      {remises.map(remise => (
        <Paper key={remise.id} sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>
            {remise.label} — {remise.type === 'pourcentage' ? `${remise.valeur}%` : `${remise.valeur}€`} — {remise.cible}
            {remise.conditions && ` — ${remise.conditions}`}
          </span>
          <IconButton color="error" onClick={() => handleDelete(remise.id)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
}
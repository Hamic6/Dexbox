import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const initialVoyageur = {
  prenom: '',
  nom: '',
  email: '',
  phone: '',
  actif: true,
  notes: '',
  marketing: [],
  travelDocs: [],
};

const marketingOptions = [
  'Newsletter',
  'Promotions',
  'Offres partenaires',
];

export default function AddVoyageur({ onSave, onCancel, voyageur }) {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(voyageur || initialVoyageur);
  const [newDoc, setNewDoc] = useState({ type: '', numero: '' });

  // Gestion des champs
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gestion des préférences marketing
  const handleMarketingChange = option => {
    setForm({
      ...form,
      marketing: form.marketing.includes(option)
        ? form.marketing.filter(o => o !== option)
        : [...form.marketing, option],
    });
  };

  // Gestion des travel docs
  const handleAddDoc = () => {
    if (newDoc.type && newDoc.numero) {
      setForm({
        ...form,
        travelDocs: [...form.travelDocs, newDoc],
      });
      setNewDoc({ type: '', numero: '' });
    }
  };
  const handleDeleteDoc = idx => {
    setForm({
      ...form,
      travelDocs: form.travelDocs.filter((_, i) => i !== idx),
    });
  };

  // Validation simple
  const isValid = form.prenom && form.nom;

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Identification" />
        <Tab label="Travel Doc" />
        <Tab label="Marketing" />
        <Tab label="Notes" />
      </Tabs>
      {tab === 0 && (
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Prénom"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            required
          />
          <TextField
            label="Nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
          <TextField
            label="Téléphone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </Stack>
      )}
      {tab === 1 && (
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <TextField
              label="Type de document"
              value={newDoc.type}
              onChange={e => setNewDoc({ ...newDoc, type: e.target.value })}
              size="small"
            />
            <TextField
              label="Numéro"
              value={newDoc.numero}
              onChange={e => setNewDoc({ ...newDoc, numero: e.target.value })}
              size="small"
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddDoc}
              disabled={!newDoc.type || !newDoc.numero}
            >
              Ajouter
            </Button>
          </Stack>
          {form.travelDocs.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Aucun document ajouté.
            </Typography>
          )}
          {form.travelDocs.map((doc, idx) => (
            <Paper key={idx} sx={{ p: 1, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
              <span>{doc.type} - {doc.numero}</span>
              <IconButton onClick={() => handleDeleteDoc(idx)} size="small" color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}
      {tab === 2 && (
        <Stack spacing={1} sx={{ mt: 1 }}>
          {marketingOptions.map(option => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={form.marketing.includes(option)}
                  onChange={() => handleMarketingChange(option)}
                />
              }
              label={option}
            />
          ))}
        </Stack>
      )}
      {tab === 3 && (
        <TextField
          label="Notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          multiline
          minRows={3}
          fullWidth
        />
      )}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }} justifyContent="flex-end">
        {onCancel && (
          <Button onClick={onCancel} color="inherit">
            Annuler
          </Button>
        )}
        <Button
          variant="contained"
          onClick={() => onSave && onSave(form)}
          disabled={!isValid}
        >
          Enregistrer
        </Button>
      </Stack>
    </Box>
  );
}
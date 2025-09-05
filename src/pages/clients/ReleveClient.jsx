import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  Checkbox, TextField, Select, MenuItem, Button, Stack, Divider, Autocomplete
} from '@mui/material';

const templates = ['Standard', 'Complet', 'Personnalisé'];
const clientTypes = ['Entreprise', 'Particulier', 'VIP'];
const clientsList = [
  { label: 'Client A', id: 1 },
  { label: 'Client B', id: 2 },
  { label: 'Client C', id: 3 },
];

export default function ReleveClient() {
  const [typeReleve, setTypeReleve] = useState('historique');
  const [periode, setPeriode] = useState({ debut: '', fin: '' });
  const [datePrecise, setDatePrecise] = useState('');
  const [dossier, setDossier] = useState('');
  const [afficherDetail, setAfficherDetail] = useState(false);
  const [soldeNonNul, setSoldeNonNul] = useState(false);
  const [factureEchue, setFactureEchue] = useState(false);
  const [joursEchus, setJoursEchus] = useState('');
  const [template, setTemplate] = useState('');
  const [clientSelection, setClientSelection] = useState('tous');
  const [clients, setClients] = useState([]);
  const [clientType, setClientType] = useState('');
  const [exclureSoldeNul, setExclureSoldeNul] = useState(false);
  const [exclureLimiteCredit, setExclureLimiteCredit] = useState(false);
  const [exclureDesactives, setExclureDesactives] = useState(false);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Consulter le relevé client</Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Type de relevé */}
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel>Type de relevé</FormLabel>
            <RadioGroup
              row
              value={typeReleve}
              onChange={e => setTypeReleve(e.target.value)}
            >
              <FormControlLabel value="historique" control={<Radio />} label="Historique Compte" />
              <FormControlLabel value="pendantes" control={<Radio />} label="Transactions pendantes" />
              <FormControlLabel value="dossier" control={<Radio />} label="Dossier" />
            </RadioGroup>
          </FormControl>

          {/* Période ou date ou dossier selon le type */}
          {typeReleve === 'historique' && (
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField
                label="Début"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={periode.debut}
                onChange={e => setPeriode(p => ({ ...p, debut: e.target.value }))}
                fullWidth
              />
              <TextField
                label="Fin"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={periode.fin}
                onChange={e => setPeriode(p => ({ ...p, fin: e.target.value }))}
                fullWidth
              />
            </Stack>
          )}
          {typeReleve === 'pendantes' && (
            <TextField
              label="Jusqu'à la date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={datePrecise}
              onChange={e => setDatePrecise(e.target.value)}
              sx={{ mb: 2 }}
              fullWidth
            />
          )}
          {typeReleve === 'dossier' && (
            <TextField
              label="N° Dossier"
              value={dossier}
              onChange={e => setDossier(e.target.value)}
              sx={{ mb: 2 }}
              fullWidth
            />
          )}

          {/* Options */}
          <FormControlLabel
            control={
              <Checkbox
                checked={afficherDetail}
                onChange={e => setAfficherDetail(e.target.checked)}
              />
            }
            label="Afficher le détail des transactions"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={soldeNonNul}
                onChange={e => setSoldeNonNul(e.target.checked)}
              />
            }
            label="Uniquement les transactions à solde non nul"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={factureEchue}
                onChange={e => setFactureEchue(e.target.checked)}
              />
            }
            label="Factures échues au-delà de X jours"
          />
          {factureEchue && (
            <TextField
              label="Nombre de jours"
              type="number"
              value={joursEchus}
              onChange={e => setJoursEchus(e.target.value)}
              sx={{ mb: 2, ml: 2, width: 120 }}
              size="small"
            />
          )}

          {/* Template */}
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <FormLabel>Modèle de relevé client</FormLabel>
            <Select
              value={template}
              onChange={e => setTemplate(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Sélectionner un modèle</MenuItem>
              {templates.map(t => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sélection des clients */}
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel>Sélectionner des clients</FormLabel>
            <RadioGroup
              value={clientSelection}
              onChange={e => setClientSelection(e.target.value)}
            >
              <FormControlLabel value="tous" control={<Radio />} label="Tous" />
              <FormControlLabel value="plusieurs" control={<Radio />} label="Plusieurs" />
              <FormControlLabel value="type" control={<Radio />} label="Client de Type" />
            </RadioGroup>
          </FormControl>
          {clientSelection === 'plusieurs' && (
            <Autocomplete
              multiple
              options={clientsList}
              getOptionLabel={option => option.label}
              value={clients}
              onChange={(e, value) => setClients(value)}
              renderInput={params => (
                <TextField {...params} label="Sélectionner les clients" placeholder="Clients" />
              )}
              sx={{ mb: 2 }}
            />
          )}
          {clientSelection === 'type' && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select
                value={clientType}
                onChange={e => setClientType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Sélectionner un type</MenuItem>
                {clientTypes.map(t => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Exclusions */}
          <Typography variant="subtitle2" sx={{ mt: 2 }}>Ne pas générer les relevés suivants :</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={exclureSoldeNul}
                onChange={e => setExclureSoldeNul(e.target.checked)}
              />
            }
            label="Solde client nul"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={exclureLimiteCredit}
                onChange={e => setExclureLimiteCredit(e.target.checked)}
              />
            }
            label="Clients dans la limite crédit autorisé"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={exclureDesactives}
                onChange={e => setExclureDesactives(e.target.checked)}
              />
            }
            label="Clients désactivés"
          />

          {/* Actions */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary">Aperçu</Button>
            <Button variant="outlined" color="secondary">Imprimer</Button>
            <Button variant="outlined" color="info">Email</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
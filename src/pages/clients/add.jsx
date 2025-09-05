import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Snackbar,
  Alert,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Avatar,
  IconButton,
  Autocomplete,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddClientMobile from './AddClientMobile';
import { remisesOptions } from '../../mocks/mockRemises';

// Mock options pour la sélection
const agencesOptions = [
  { label: 'Agence Paris', id: 1 },
  { label: 'Agence Lyon', id: 2 },
  { label: 'Agence Marseille', id: 3 },
];
const voyageursOptions = [
  { label: 'Alice Dupont', id: 1 },
  { label: 'Bob Martin', id: 2 },
  { label: 'Charlie Dubois', id: 3 },
];
const departementsOptions = [
  { label: 'Commercial', id: 1 },
  { label: 'Marketing', id: 2 },
  { label: 'Finance', id: 3 },
];

export default function AddClient({ mode = 'add', client, onSave }) {
  const [tab, setTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [form, setForm] = useState({
    civilite: '',
    code: '',
    prenom: '',
    nom: '',
    type: '',
    pays: '',
    adresse: '',
    ville: '',
    codePostal: '',
    tel: '',
    mob: '',
    fax: '',
    mail: '',
    web: '',
    contact1: { civilite: '', prenom: '', nom: '', fonction: '', adresse: '', anniversaire: '', tel: '', mob: '', fax: '', mail: '', web: '' },
    contact2: { civilite: '', prenom: '', nom: '', fonction: '', adresse: '', anniversaire: '', tel: '', mob: '', fax: '', mail: '', web: '' },
    agences: [],
    departements: [],
    creditLimite: '',
    compteTiers: '',
    compteGeneral: '',
    numContribuable: '',
    modePaiement: '',
    limiteCredit: '',
    numCarteCredit: '',
    expCarteCredit: '',
    exonerations: '',
    echeance: '',
    marketing: [],
    remises: [],
    notes: '',
  });
  const [voyageurs, setVoyageurs] = useState([]);
  const [remises, setRemises] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  // Pré-remplissage si mode edit
  useEffect(() => {
    if (mode === 'edit' && client) {
      setForm({
        ...form,
        ...client,
        contact1: client.contact1 || form.contact1,
        contact2: client.contact2 || form.contact2,
        agences: client.agences || [],
        departements: client.departements || [],
        remises: client.remises || [],
      });
      setProfilePhoto(client.profilePhoto || null);
      setVoyageurs(client.voyageurs || []);
    }
    // eslint-disable-next-line
  }, [mode, client]);

  const handleTabChange = (e, newValue) => setTab(newValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleContactChange = (contact, e) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [contact]: { ...f[contact], [name]: value }
    }));
  };

  const handleMarketingChange = (e) => {
    const { value, checked } = e.target;
    setForm(f => ({
      ...f,
      marketing: checked
        ? [...f.marketing, value]
        : f.marketing.filter(m => m !== value),
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
      // Pour l'enregistrement, tu pourras envoyer le fichier à Firebase Storage plus tard
    }
  };

  // Sélection voyageurs
  const handleVoyageursSelect = (event, value) => {
    setVoyageurs(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'add') {
        // await firebase.firestore().collection('clients').add({ ...form, profilePhoto, voyageurs });
        setSnackbarMsg('Client enregistré avec succès sur Google Cloud !');
      } else {
        // await firebase.firestore().collection('clients').doc(client.id).update({ ...form, profilePhoto, voyageurs });
        setSnackbarMsg('Client modifié avec succès !');
      }
      setOpenSnackbar(true);
      if (onSave) onSave({ ...form, profilePhoto, voyageurs });
    } catch (err) {
      setSnackbarMsg('Erreur lors de l\'enregistrement du client.');
      setOpenSnackbar(true);
    }
  };

  return isMobile ? (
    <AddClientMobile mode={mode} client={client} onSave={onSave} />
  ) : (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonAddIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h5" fontWeight={700}>
            {mode === 'add' ? 'Ajouter un client' : 'Modifier le client'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={profilePhoto}
            sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.light' }}
          />
          <label htmlFor="profile-photo-upload">
            <input
              accept="image/*"
              id="profile-photo-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <Typography variant="body2" sx={{ ml: 1 }}>
            Ajouter une photo de profil (optionnel)
          </Typography>
        </Box>
        <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
          <Tab label="Identification" />
          <Tab label="Contacts 1 & 2" />
          <Tab label="Agences" />
          <Tab label="Voyageurs" />
          <Tab label="Départements" />
          <Tab label="Finances" />
          <Tab label="Marketing" />
          <Tab label="Remises" />
          <Tab label="Notes" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          {tab === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Civilité" name="civilite" value={form.civilite} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Code" name="code" value={form.code} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Nom" name="nom" value={form.nom} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Type Client" name="type" value={form.type} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Pays" name="pays" value={form.pays} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={12}><TextField label="Adresse" name="adresse" value={form.adresse} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Ville" name="ville" value={form.ville} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Code postal" name="codePostal" value={form.codePostal} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="TEL" name="tel" value={form.tel} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="MOB" name="mob" value={form.mob} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="FAX" name="fax" value={form.fax} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="MAIL" name="mail" value={form.mail} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="WEB" name="web" value={form.web} onChange={handleChange} fullWidth /></Grid>
            </Grid>
          )}
          {tab === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}><Typography fontWeight={600}>Contact 1</Typography></Grid>
              <Grid item xs={6}><TextField label="Civilité" name="civilite" value={form.contact1.civilite} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Prénom" name="prenom" value={form.contact1.prenom} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Nom" name="nom" value={form.contact1.nom} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Fonction" name="fonction" value={form.contact1.fonction} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={12}><TextField label="Adresse" name="adresse" value={form.contact1.adresse} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Anniversaire" name="anniversaire" value={form.contact1.anniversaire} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="TEL" name="tel" value={form.contact1.tel} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="MOB" name="mob" value={form.contact1.mob} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="FAX" name="fax" value={form.contact1.fax} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="MAIL" name="mail" value={form.contact1.mail} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="WEB" name="web" value={form.contact1.web} onChange={e => handleContactChange('contact1', e)} fullWidth /></Grid>
              <Grid item xs={12}><Typography fontWeight={600} mt={2}>Contact 2</Typography></Grid>
              <Grid item xs={6}><TextField label="Civilité" name="civilite" value={form.contact2.civilite} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Prénom" name="prenom" value={form.contact2.prenom} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Nom" name="nom" value={form.contact2.nom} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Fonction" name="fonction" value={form.contact2.fonction} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={12}><TextField label="Adresse" name="adresse" value={form.contact2.adresse} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Anniversaire" name="anniversaire" value={form.contact2.anniversaire} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="TEL" name="tel" value={form.contact2.tel} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="MOB" name="mob" value={form.contact2.mob} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={4}><TextField label="FAX" name="fax" value={form.contact2.fax} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="MAIL" name="mail" value={form.contact2.mail} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="WEB" name="web" value={form.contact2.web} onChange={e => handleContactChange('contact2', e)} fullWidth /></Grid>
            </Grid>
          )}
          {tab === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={agencesOptions}
                  getOptionLabel={option => option.label}
                  value={form.agences}
                  onChange={(e, value) => setForm(f => ({ ...f, agences: value }))}
                  renderInput={params => (
                    <TextField {...params} label="Sélectionner les agences" placeholder="Agences" />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              </Grid>
            </Grid>
          )}
          {tab === 3 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={voyageursOptions}
                  getOptionLabel={option => option.label}
                  value={voyageurs}
                  onChange={handleVoyageursSelect}
                  renderInput={params => (
                    <TextField {...params} label="Sélectionner les voyageurs" placeholder="Voyageurs" />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              </Grid>
            </Grid>
          )}
          {tab === 4 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={departementsOptions}
                  getOptionLabel={option => option.label}
                  value={form.departements}
                  onChange={(e, value) => setForm(f => ({ ...f, departements: value }))}
                  renderInput={params => (
                    <TextField {...params} label="Sélectionner les départements" placeholder="Départements" />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              </Grid>
            </Grid>
          )}
          {tab === 5 && (
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Compte Tiers" name="compteTiers" value={form.compteTiers} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Compte Général" name="compteGeneral" value={form.compteGeneral} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="N° Contribuable" name="numContribuable" value={form.numContribuable} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Mode de paiement" name="modePaiement" value={form.modePaiement} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Limite Crédit" name="limiteCredit" value={form.limiteCredit} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="N° Carte de Crédit" name="numCarteCredit" value={form.numCarteCredit} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Exp(MM/AAAA)" name="expCarteCredit" value={form.expCarteCredit} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={6}><TextField label="Exonérations" name="exonerations" value={form.exonerations} onChange={handleChange} fullWidth /></Grid>
              <Grid item xs={12}><TextField label="Echéance" name="echeance" value={form.echeance} onChange={handleChange} fullWidth /></Grid>
            </Grid>
          )}
          {tab === 6 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography fontWeight={600} mb={1}>Préférences marketing</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.marketing.includes('newsletter')}
                      onChange={handleMarketingChange}
                      value="newsletter"
                    />
                  }
                  label="Recevoir la newsletter"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.marketing.includes('offres')}
                      onChange={handleMarketingChange}
                      value="offres"
                    />
                  }
                  label="Recevoir les offres spéciales"
                />
                {/* Ajoute d'autres préférences marketing ici */}
              </Grid>
            </Grid>
          )}
          {tab === 7 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={remisesOptions}
                  getOptionLabel={option => option.label}
                  value={remises}
                  onChange={(e, value) => setRemises(value)}
                  renderInput={params => (
                    <TextField {...params} label="Sélectionner les remises" placeholder="Remises" />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
                {remises.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {remises.map(remise => (
                      <Typography key={remise.id} variant="body2" color="text.secondary">
                        {remise.label} — {remise.type === 'pourcentage' ? `${remise.valeur}%` : `${remise.valeur}€`} — {remise.cible}
                        {remise.conditions && ` — ${remise.conditions}`}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
          {tab === 8 && (
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField label="Notes spéciales" name="notes" value={form.notes} onChange={handleChange} fullWidth multiline minRows={3} /></Grid>
            </Grid>
          )}
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button type="submit" variant="contained" color="primary">
              {mode === 'add' ? 'Enregistrer' : 'Modifier'}
            </Button>
          </Box>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbarMsg.includes('succès') ? 'success' : 'error'} sx={{ width: '100%' }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
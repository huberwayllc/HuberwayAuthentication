import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./SettingsProfile.css";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import UsersTeamMenu from '../../components/settings/UsersTeamMenu';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Stili per il modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const SettingsTeam = () => {
  const [openModal, setOpenModal] = useState(false);

  // Campi del form
  const [teamName, setTeamName] = useState('');
  const [manager, setManager] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    // Puoi aggiungere validazioni o invio qui
    console.log({ teamName, manager, members, description });
    setOpenModal(false);
  };

  return (
    <div className='p-2'>
      <h1>Team</h1>

       <UsersTeamMenu />

      <div className='d-flex justify-content-end gap-4'>
        <input placeholder='Search..' style={{ width: "250px" }} className='inp' />
        <button className='btn btn-primary' onClick={() => setOpenModal(true)}>Crea Team</button>
      </div>

      <div className='text-start d-felx justify-content-start mt-4'>
        <h2 className='text-start'>Imposta le autorizzazioni del team</h2>
        <p>Mantieni il tuo team organizzato ed efficiente assicurandoti che ogni utente abbia accesso ai giusti asset</p>
        <p>Vuoi scoprire di più? Informazioni sui team</p>
      </div>

      {/* MODAL */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Crea un nuovo Team
          </Typography>
          <label className='mt-4 p-0'>Nome Team</label>
          <input
            fullWidth
            required
            placeholder="Nome Team"
            className='inp w-100'
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            margin="normal"
          />
          <label className='mt-4 p-0'>Manager</label>
          <input
            fullWidth
            required
            className='inp w-100'
            placeholder="Manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            margin="normal"
          />
          <label className='mt-4 p-0'>Membri</label>
          <input
            fullWidth
            placeholder="Membri"
            className='inp w-100'
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            margin="normal"
          />
          <label className='mt-4 p-0'>Descrizione</label>
          <textarea
            fullWidth
            placeholder="Descrizione"
            className='inp w-100'
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <button className='btn' onClick={() => setOpenModal(false)}>Annulla</button>
            <button className='btn btn-primary' onClick={handleCreate} variant="contained">Crea</button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingsTeam;

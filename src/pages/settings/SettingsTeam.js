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

const SettingsTeam = () => {
  // Stato per il menu "Stato"
  const [anchorElStato, setAnchorElStato] = useState(null);
  const [selectedStatoFilter, setSelectedStatoFilter] = useState([]);

  // Stato per il menu "Ultima attivazione"
  const [anchorElAttivazione, setAnchorElAttivazione] = useState(null);
  const [selectedAttivazioneFilter, setSelectedAttivazioneFilter] = useState(null);

  const statoOptions = [
    'Disattivato',
    'Invito in sospeso',
    'Mancato recapito dell\'invito',
    'Invito accettato'
  ];

  const attivazioneOptions = [
    'Oggi', 'Ieri', 'Ultimi 7 giorni', 'Ultimi 14 giorni',
    'Ultimi 30 giorni', 'Ultimi 60 giorni', 'Ultimi 90 giorni',
    'Ultimi 180 giorni', 'Ultimi 365 giorni'
  ];

  return (
    <div className='p-2'>
      <h1>Team</h1>

      <UsersTeamMenu />

    <div className='d-flex justify-content-end gap-4'>
        <input placeholder='Search..' style={{width: "250px"}} className='inp'/>
        <button className='btn btn-primary'>Crea Team</button>
    </div>

    <div className='text-start d-felx justify-content-start mt-4'>
        <h2 className='text-start'>Imposta le autorizzazioni del team</h2>
        <p>Mantieni il tuo team organizzato ed efficiente assicurandoti che ogni utente abbia accesso ai giusti asset</p>
        <p>Vuoi scoprire di più? Informazioni sui team</p>
    </div>

    </div>
  );
};

export default SettingsTeam;

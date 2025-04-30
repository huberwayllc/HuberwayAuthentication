import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./SettingsProfile.css";
import UsersTeamMenu from '../../components/settings/UsersTeamMenu';
import UserStatsBox from '../../components/settings/UserStatsBox';
import UserFiltersWithTable from '../../components/settings/UserFiltersWithTable';

const SettingsUsersTeam = () => {
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
      <h1>Utenti e Team</h1>

      <UsersTeamMenu />

      <div className='mt-2'>
        <p className='mt-4'>
          Crea nuovi utenti, personalizza le autorizzazioni utente e rimuovi utenti dal tuo account.
          Scopri di più sulle autorizzazioni utente
        </p>
      </div>

      <UserStatsBox />

      <UserFiltersWithTable />


    </div>
  );
};

export default SettingsUsersTeam;

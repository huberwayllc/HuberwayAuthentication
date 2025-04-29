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

      <ul className='d-flex justify-content-between list-unstyled gap-3 mt-4 align-items-center flex-wrap' style={{ padding: 0, margin: 0 }}>
        {/* Menu Stato */}
        <li>
          <button
            onClick={(e) => setAnchorElStato(e.currentTarget)}
            className='btn btn-link p-0 text-decoration-none fs-6'
          >
            Stato {selectedStatoFilter.length > 0 ? `(${selectedStatoFilter.length})` : ''}
            <ArrowDropDownIcon />
          </button>
          <Menu
            anchorEl={anchorElStato}
            open={Boolean(anchorElStato)}
            onClose={() => setAnchorElStato(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {statoOptions.map((label, idx) => (
              <MenuItem
                key={idx}
                onClick={() => {
                  setSelectedStatoFilter(prev => {
                    const alreadySelected = prev.includes(label);
                    if (alreadySelected) {
                      return prev.filter(item => item !== label);
                    } else {
                      return [...prev, label];
                    }
                  });
                }}
              >
                <Checkbox checked={selectedStatoFilter.includes(label)} />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Menu>
        </li>

        {/* Menu Ultima attivazione */}
        <li>
          <button
            onClick={(e) => setAnchorElAttivazione(e.currentTarget)}
            className='btn btn-link p-0 text-decoration-none fs-6'
          >
            {selectedAttivazioneFilter || 'Ultima attivazione'}
            <ArrowDropDownIcon />
          </button>
          <Menu
            anchorEl={anchorElAttivazione}
            open={Boolean(anchorElAttivazione)}
            onClose={() => setAnchorElAttivazione(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {attivazioneOptions.map((label, idx) => (
              <MenuItem
                key={idx}
                onClick={() => {
                  setSelectedAttivazioneFilter(label);
                  setAnchorElAttivazione(null);
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </li>

        {/* Altri filtri */}
        <li><button className='btn btn-link p-0 text-decoration-none fs-6'>Cancella filtri rapidi</button></li>
        <li><button className='btn btn-link p-0 text-decoration-none fs-6'>Filtri avanzati</button></li>
        <li><button className='btn btn-link p-0 text-decoration-none fs-6'>Cancella tutto</button></li>
        <div className='d-flex gap-2'>
          <li><button className='btn btn-outline-secondary fs-6 p-3 bg-transparent'>Azioni</button></li>
          <li><button className='btn btn-primary fs-6 p-3'>Crea Utente</button></li>
        </div>

      </ul>
    </div>
  );
};

export default SettingsUsersTeam;

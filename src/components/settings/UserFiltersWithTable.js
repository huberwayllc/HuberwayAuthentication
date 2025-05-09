import React, { useState, useMemo } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./styleTab.css";

// Mock dati utenti
const mockUserData = [
  {
    name: 'Mario Rossi',
    access: 'Si',
    team: 'Marketing',
    status: 'Disattivato',
    inviteStatus: 'Inviato',
    lastActive: 'Ieri',
    emailStatus: 'Attivo',
    calendarStatus: 'Non connesso',
    calendarSync: 'Mai',
    schedulingPages: '3',
    createdAt: '2023-01-12',
    passwordLastModified: '2024-03-04'
  },
  {
    name: 'Luisa Bianchi',
    access: 'No',
    team: 'Vendite',
    status: 'Invito accettato',
    inviteStatus: 'Accettato',
    lastActive: 'Ultimi 7 giorni',
    emailStatus: 'In errore',
    calendarStatus: 'Connesso',
    calendarSync: 'Ieri',
    schedulingPages: '5',
    createdAt: '2022-12-05',
    passwordLastModified: '2023-09-02'
  },
  // Aggiungi altri utenti secondo necessità
];

// Corretto: destrutturiamo le props
const UserFiltersWithTable = ({ onCreateUser }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [anchorElStato, setAnchorElStato] = useState(null);
  const [selectedStatoFilter, setSelectedStatoFilter] = useState([]);

  const [anchorElAttivazione, setAnchorElAttivazione] = useState(null);
  const [selectedAttivazioneFilter, setSelectedAttivazioneFilter] = useState(null);

  const statoOptions = [
    'Disattivato',
    'Invito in sospeso',
    "Mancato recapito dell'invito",
    'Invito accettato'
  ];

  const attivazioneOptions = [
    'Oggi', 'Ieri', 'Ultimi 7 giorni', 'Ultimi 14 giorni',
    'Ultimi 30 giorni', 'Ultimi 60 giorni', 'Ultimi 90 giorni',
    'Ultimi 180 giorni', 'Ultimi 365 giorni'
  ];

  const filteredUsers = useMemo(() => {
    return mockUserData.filter(user => {
      const matchStatus = selectedStatoFilter.length === 0 || selectedStatoFilter.includes(user.status);
      const matchActivation = !selectedAttivazioneFilter || user.lastActive === selectedAttivazioneFilter;
      return matchStatus && matchActivation;
    });
  }, [selectedStatoFilter, selectedAttivazioneFilter]);

  const allUserNames = filteredUsers.map(u => u.name);
  const isAllSelected = selectedUsers.length === filteredUsers.length && filteredUsers.length > 0;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allUserNames);
    }
  };

  const toggleSelectUser = (name) => {
    setSelectedUsers(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const resetFilters = () => {
    setSelectedStatoFilter([]);
    setSelectedAttivazioneFilter(null);
  };

  return (
    <div className='d-flex flex-column mt-5'>
      <div className='d-flex justify-content-between align-items-center flex-wrap'>
        <ul className='d-flex list-unstyled gap-4 align-items-center flex-wrap' style={{ padding: 0, margin: 0 }}>
          {/* Stato */}
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
                    setSelectedStatoFilter(prev =>
                      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
                    );
                  }}
                >
                  <Checkbox checked={selectedStatoFilter.includes(label)} />
                  <ListItemText primary={label} />
                </MenuItem>
              ))}
            </Menu>
          </li>

          {/* Ultima attivazione */}
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

          {/* Filtri aggiuntivi */}
          <li><button className='btn btn-link p-0 text-decoration-none fs-6' onClick={() => setSelectedStatoFilter([])}>Cancella filtri rapidi</button></li>
          <li><button className='btn btn-link p-0 text-decoration-none fs-6'>Filtri avanzati</button></li>
          <li><button className='btn btn-link p-0 text-decoration-none fs-6' onClick={resetFilters}>Cancella tutto</button></li>
        </ul>

        <div className='d-flex gap-2 mt-2 mt-md-0'>
          <button className='btn btn-outline-secondary fs-6 p-3 bg-transparent'>Azioni</button>
          {/* Corretto: chiama la prop onCreateUser */}
          <button onClick={onCreateUser} className='btn btn-primary fs-6 p-3'>Crea Utente</button>
        </div>
      </div>

      {/* Tabella con scroll orizzontale */}
      <div className='w-100 mt-0 boxShadow1 mt-1' style={{ overflowX: 'auto' }}>
        <table className='table table-bordered mt-0' style={{ minWidth: '900px', backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className='fw-bold'>Nome</th>
              <th className='fw-bold'>Accedi</th>
              <th className='fw-bold'>Team principale</th>
              <th className='fw-bold'>Stato invito</th>
              <th className='fw-bold'>Ultima attivazione</th>
              <th className='fw-bold'>Stato email</th>
              <th className='fw-bold'>Stato calendario</th>
              <th className='fw-bold'>Sincronizzazione calendario</th>
              <th className='fw-bold'>Pagine di pianificazione</th>
              <th className='fw-bold'>Data di creazione</th>
              <th className='fw-bold'>Ultima modifica alla password</th>
            </tr>
          </thead>

          <tbody style={{ backgroundColor: 'white' }}>
            {filteredUsers.length === 0 ? (
              <tr><td colSpan="12">Nessun utente trovato con i filtri selezionati.</td></tr>
            ) : (
              filteredUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.name)}
                      onChange={() => toggleSelectUser(user.name)}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.access}</td>
                  <td>{user.team}</td>
                  <td>{user.inviteStatus}</td>
                  <td>{user.lastActive}</td>
                  <td>{user.emailStatus}</td>
                  <td>{user.calendarStatus}</td>
                  <td>{user.calendarSync}</td>
                  <td>{user.schedulingPages}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.passwordLastModified}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserFiltersWithTable;

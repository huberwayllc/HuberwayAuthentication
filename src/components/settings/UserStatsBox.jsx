import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const statsData = [
  {
    title: 'UTENTI RECENTI',
    value: 1,
    info: "Utenti che hanno eseguito l'accesso negli ultimi 90 giorni.",
  },
  {
    title: 'UTENTI INATTIVI',
    value: 0,
    subText: 'Riesamina Utenti',
    info: "Utenti che non hanno eseguito l'accesso per oltre 90 giorni.",
  },
  {
    title: 'UTENTI DISATTIVATI',
    value: 0,
    subText: 'Riesamina Utenti',
    info: "Utenti che non hanno più accesso all'account ma il cui profilo rimane nell'account per preservare le attività storiche.",
  },
  {
    title: 'INVIO IN SOSPESO',
    value: 0,
    subText: 'Invia nuovamente gli inviti',
    info: "La cancellazione dello stato in sospeso dell'utente può richiedere fino a 24 ore dall'accettazione dell'invito. In questo periodo, potrebbe non avere accesso ad alcune azioni.",
  },
  {
    title: "MANCATO RECAPITO DELL'INVITO",
    value: 0,
    info: 'verifica che le impostazioni dei membri del team relative a notifiche, casella di posta in arrivo ed elenchi di inclusione siano corrette.',
  },
  {
    title: "UTENTI ISCRITTI ALL'AUTENTICAZIONE A DUE FATTORI",
    value: 0,
    info: "Utenti che accedono al tuo account tramite l'autenticazione a due fattori. Maggiore è il numero di utenti che la utilizzano, più il tuo account sarà protetto da accessi non autorizzati.",
  },
];

const UserStatsBox = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverText, setPopoverText] = useState('');

  const handleClick = (event, text) => {
    setAnchorEl(event.currentTarget);
    setPopoverText(text);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'info-popover' : undefined;

  return (
    <div style={{ border: "1px solid #B1C2D5" }} className='mt-4 p-4'>
      <div className='d-flex flex-wrap align-items-start gap-4'>
        {statsData.map((stat, index) => (
          <div
            key={index}
            className='d-flex flex-column align-items-center text-center'
            style={{ minWidth: '160px', maxWidth: "200px", flex: '1' }}
          >
            <div className='d-flex gap-1 align-items-center justify-content-center text-center'>
              <h6 style={{ fontSize: '12px', fontWeight: "600" }}>{stat.title}</h6>
              {stat.info && (
                <InfoIcon
                  style={{ fontSize: "18px", color: "#B1C2D5", cursor: 'pointer' }}
                  onClick={(e) => handleClick(e, stat.info)}
                />
              )}
            </div>
            <p className='mb-0' style={{ fontSize: "28px" }}>{stat.value}</p>
            {stat.subText && (
              <h6 style={{ fontSize: '14px', fontWeight: "600", color: "#B1C2D5" }}>
                {stat.subText}
              </h6>
            )}
          </div>
        ))}
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onExited={() => setPopoverText('')}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        >
        <Typography sx={{ p: 2, maxWidth: 200 }}>{popoverText}</Typography>
    </Popover>

    </div>
  );
};

export default UserStatsBox;

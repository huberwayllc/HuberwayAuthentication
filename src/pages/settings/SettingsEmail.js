// Profile.js
import React from 'react';
import SettingsMenu from "../../components/settings/SettingsMenu";
import Avatar from '@mui/material/Avatar';
import "./SettingsProfile.css"
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';


const SettingsEmail = () => {
  return (
    <>
    <div className='p-2'>
      <h1>Generale</h1>

      <SettingsMenu />

      <div style={{borderBottom: "1px solid gray"}} className='mt-2'>
        <p className='mt-2'>Queste preferenze si applicano solo a te. Per la gestione delle e-mail a livello di account, vai alle Impostazioni di registrazione delle e-mail.</p>
      </div>

      <div className='mt-3 mb-4 d-flex flex-column align-items-start'>
        <h2 style={{lineHeight: "18px"}} className='fw-bold'>Email</h2>
        <p style={{width: "75%"}}>Connetti i tuoi account e-mail personali a HubSpot per registrare, tracciare, inviare e ricevere e-mail in HubSpot CRM. Per gestire qualsiasi e-mail del team, vai alle impostazioni della casella di posta in arrivo.</p>
      </div>

        <div className='d-flex'>
            <CheckIcon />
            <p>Invia e pianifica e-mail da HubSpot</p>
        </div>
    
      <div className='d-flex'>
        <CheckIcon />
        <p>Registra automaticamente le risposte alle e-mail su HubSpot</p>
      </div>
      
      <div className='d-flex'>
        <CheckIcon />
        <p>Suggerisci task di follow-up e raccogli i dettagli dei contatti dalla tua e-mail</p>
      </div>

    <div className='mt-4'>
        <Button variant='contained'>
            Connetti e-mail personale
        </Button>
    </div>

    
    <div className='mt-5'>
        <h6 style={{fontWeight: "bold"}} className=' mt-4'>Configura</h6>
    </div>

      

      
      
    </div>
      
    </>

  )
};

export default SettingsEmail;

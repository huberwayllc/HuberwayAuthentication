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

    <div>
      <p className='mb-0 pClick'>Aggiungi alias e-mail</p>
      <p style={{fontSize: "12px" }}>Un alias e-mail ti consente di inviare al di fuori di HubSpot e-mail da associare al tuo utente. Scopri di più.</p>
    </div>

    <div className='mt-3'>
      <p className='mb-0 pClick'>Gestisci firme e-mail</p>
      <p>La firma sarà utilizzata negli scambi di e-mail diretti in HubSpot CRM e come token di personalizzazione per le e-mail di marketing.</p>
    </div>

    <div className='mt-3 d-flex align-items-start gap-2'>
      <div className=''>
        <input type="checkbox" checked readOnly />
      </div>
      <div>
        <p style={{fontSize: "14px", fontWeight: "bold"}} className='mb-0'>Includi link di annullamento dell'abbonamento</p>
        <p>
          Includi un link in fondo alle e-mail che consenta ai destinatari di annullare l'iscrizione.
          Ti aiuterà a rispettare le leggi locali sullo spam e a migliorare la capacità di consegna.
        </p>
        <Button
          variant="contained"
          style={{ textTransform: "none" }}
        >
          Visualizza in anteprima link di annullamento dell'abbonamento
        </Button>
      </div>
    </div>

    <div className='mt-5 text-start d-flex flex-column align-items-start'>
      <h2 style={{lineHeight: "18px"}} className='fw-bold'>Non registrare mai</h2>
      <p>Le e-mail inviate agli indirizzi su questo elenco non verranno salvate automaticamente nella CRM. In alcuni casi, le e-mail inviate a o da questi indirizzi verranno salvate nella CRM, ma non verranno associate ad alcun contatto su questo elenco. Scopri di più sull'elenco Non registrare mai. Per gestire l'elenco Non registrare mai per tutti gli utenti, vai alle impostazioni di registrazione e-mail.</p>
    </div>
      

      
      
    </div>
      
    </>

  )
};

export default SettingsEmail;

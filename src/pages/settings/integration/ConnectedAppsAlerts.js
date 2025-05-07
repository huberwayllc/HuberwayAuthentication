import React, { useState } from 'react';
import "../SettingsProfile.css";
import ConnectedAppsMenu from '../../../components/settings/ConnectedAppMenu';

const ConnectedAppsAlerts = () => {


  return (
    <div className='p-2'>
      <h1>Team</h1>

      <ConnectedAppsMenu />


    <div className='text-start d-felx justify-content-start mt-5 ms-4'>
        <h2 className='text-start'>Notifiche</h2>
        <p className='textDarkGray'>Crea, gestisci e assegna la modalità di notifica da parte delle app connesse. Nota: le app appena installate devono essere aggiunte alle configurazioni di notifica</p>
        <button className='btn btn-primary mt-3 p-3 px-4'>Crea nuova notifica</button>
    </div>

    </div>
  );
};

export default ConnectedAppsAlerts;

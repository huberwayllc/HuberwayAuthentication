import React, { useState } from 'react';
import "./SettingsProfile.css";
import ConnectedAppsMenu from '../../components/settings/ConnectedAppMenu';

const ConnectedApps = () => {


  return (
    <div className='p-2'>
      <h1>Team</h1>

      <ConnectedAppsMenu />

    <div className='d-flex justify-content-start gap-4 mt-4'>
        <input placeholder="Cerca un'applicazione" style={{width: "300px"}} className='inp'/>
    </div>

    <div className='text-start d-felx justify-content-start mt-5 ms-4'>
        <h2 className='text-start'>Connetti la tua prima app</h2>
        <p>Visita l'App Marketplace per connettere HubSpot agli strumenti che utilizzi per potenziare la tua azienda.</p>
        <button className='btn btn-primary mt-3 p-3 px-4'>Visita App Marketplace</button>
    </div>

    </div>
  );
};

export default ConnectedApps;

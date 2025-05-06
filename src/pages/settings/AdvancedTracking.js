import React, { useState } from 'react';
import "./SettingsProfile.css";
import TrackingMenu from '../../components/settings/TrackingMenu';

const AdvancedTracking = () => {

  return (
    <div className='p-2'>
      <h1>Tracciamento di rapporti e analisi dati</h1>

      <TrackingMenu />

      <div className='mt-2'>
        <p className='mt-4'>
          Crea nuovi utenti, personalizza le autorizzazioni utente e rimuovi utenti dal tuo account.
          Scopri di più sulle autorizzazioni utente
        </p>
      </div>


    </div>
  );
};

export default AdvancedTracking;

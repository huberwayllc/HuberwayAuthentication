import React, { useState } from 'react';
import "./SettingsProfile.css";

const SettingsRoles = () => {

  return (
    <div className='p-2'>
      <h1>Ruoli</h1>

     {/* <UsersTeamMenu /> */} 

    <div className='d-flex justify-content-end gap-4'>
        <input placeholder='Search..' style={{width: "250px"}} className='inp'/>
        <button className='btn btn-primary'>Crea un ruolo</button>
    </div>

    <div className='text-start d-felx justify-content-start mt-4'>
        <h2 className='text-start'>Imposta le autorizzazioni del ruolo</h2>
        <p>Mantieni il tuo team organizzato ed efficiente assicurandoti che ogni utente abbia accesso ai giusti asset</p>
        <p>Vuoi scoprire di più? Informazioni sui team</p>
    </div>

    </div>
  );
};

export default SettingsRoles;

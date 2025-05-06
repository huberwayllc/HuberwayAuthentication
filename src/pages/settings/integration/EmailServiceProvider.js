import React, { useState } from 'react';
import "../SettingsProfile.css";

const EmailServiceProvide = () => {


  return (
    <div className='p-2'>

    <div style={{borderBottom: "1px black solid"}} className='text-start d-flex justify-content-between align-items-start pb-3'>
      <div>
        <h1>Provider di servizi e-mail</h1>
        <p>Le impostazioni di sincronizzazione e-mail sono condivise tra form pop-up e form esterni a Huberway.</p>
        
      </div>
      <div>
        <button className='btn btn-primary mt-3 p-3 px-4'>Connetti provider e-mail</button>
      </div>
    </div>

    <div className='w-100 d-flex flex-column align-items-center mt-4'>
      <h2>Sincronizza e-mail</h2>
    </div>

    </div>
  );
};

export default EmailServiceProvide;

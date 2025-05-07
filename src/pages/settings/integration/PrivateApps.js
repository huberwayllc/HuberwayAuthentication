import React, { useState } from 'react';
import "../SettingsProfile.css";

const PrivateApps = () => {


  return (
    <div className='p-2'>

    <div style={{borderBottom: "1px black solid"}} className='text-start d-flex justify-content-between align-items-start pb-3'>
      <div>
        <h1>App private</h1>
        <p className='textDarkGray'>Le app private offrono un modo potente e sicuro per effettuare chiamate API al tuo account Huberay.</p>
        
      </div>
      <div>
        <button className='btn btn-primary mt-3 p-3 px-4'>Crea un'app privata</button>
      </div>
    </div>

    <div className='w-100 d-flex flex-column align-items-center mt-4'>
      <h2 className='h2Style'>Nessun app privata</h2>
      <p className='textDarkGray'>Creane una ora per iniziare.</p>
    </div>

    </div>
  );
};

export default PrivateApps;

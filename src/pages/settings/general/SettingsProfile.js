// Profile.js
import React from 'react';
import Avatar from '@mui/material/Avatar';
import "../SettingsProfile.css"
import SettingsMenu from '../../../components/settings/SettingsMenu';


const SettingsProfile = () => {
  return (
    <>
    <div className='p-2'>
      <h1>Generale</h1>

      <SettingsMenu />

      <div className='mt-2'>
        <p className='mt-2 textDarkGray'>Queste preferenze si applicano solo a te.</p>
      </div>


      <div className='bg-white p-3 rounded-2 boxShadow1 w-auto mt-4' style={{display:"inline-block", maxWidth: "432px"}}>
        <div className='mt-0 mb-4 d-flex flex-column '>
          <h2 style={{lineHeight: "18px"}} className='h2Style m-0'>Globale</h2>
          <p className='textDarkGray'>Ciò riguarda qualsiasi account Huberway che possiedi.</p>
        </div>
        <div className='mt-0'>
          <h6 style={{lineHeight: "18px", fontSize: "14px"}} className='fw-bold text-black mt-0'>Immagine profilo</h6>
          <Avatar  sx={{ width: 70, height: 70 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
        <div className='mt-4'>
            <h6 className='mt-4 labInp'>Nome</h6>
            <input className='inp' />

            <h6 className=' mt-4 labInp'>Cognome</h6>
            <input className='inp' />

            <h6 className=' mt-4 labInp'>Lingua</h6>
            <input className='inp' />

            <h6 className=' mt-4 labInp'>Formato data, ora e numero</h6>
            <input className='inp' />

            <h6 style={{lineHeight: "10px"}} className='labInp mt-4 mb-1'>Numero di telefono</h6>
            <p className='mb-1 w-100textDarkGray' style={{lineHeight: "18px"}}>Potremmo usare questo numero di telefono per contattarti in merito a eventi di sicurezza. Fai riferimento alla nostra Privacy policy per altre informazioni</p>
            <input className='inp' />
        </div>
      </div>

     <div className='mt-5 d-flex flex-column '>
      <h2 style={{lineHeight: "18px"}} className='h2Style'>Impostazioni predefinite</h2>
      <p className='textDarkGray'>Ciò riguarda solo questo account Huberway.</p>
     </div>

     <h6 className=' mt-4 labInp'>Homepage predefinita</h6>
     <input className='inp' />

    <div className='mt-3'>
      <h6 className=' mt-4 labInp'>Orario lavorativo generico</h6>
    </div>
      
      
    </div>
      
    </>

  )
};

export default SettingsProfile;

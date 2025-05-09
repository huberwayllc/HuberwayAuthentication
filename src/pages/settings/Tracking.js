import React, { useState } from 'react';
import "./SettingsProfile.css";
import TrackingMenu from '../../components/settings/TrackingMenu';

const Tracking = () => {

  return (
    <div className='p-2'>
      <h1>Tracciamento di rapporti e analisi dati</h1>

        <TrackingMenu />

        <div className='mt-4'>
            <h2 className='mb-0 h2Style'>Installazione codice di tracciamento</h2>
            <p className='mt-0 textDarkGray'>
            Copia e incolla questo codice di tracciamento in ogni pagina del sito, subito prima del tag body
            </p>
        </div>


        <div className='mt-4'>
            <p className='mt-0 fw-bold'>
                Codice di incorporamento
            </p>
            <div className='p-2 colorBorder' style={{ borderRadius: "5px", backgroundColor: "white"}}>
                <p style={{fontSize: "16px", lineHeight: "1.4"}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidu</p>
            </div>
            <div className='d-flex gap-3'>
                <button className='btn btn-primary mt-3 p-3 px-4'>Testo </button>
                <button style={{backgroundColor: "#EAF0F6"}} className='btn btn-primary mt-3 p-3 px-4 text-black'>Invia e-mail al mio sviluppatore web </button>
            </div>

            <div className='mt-3'>
                <p className='mt-0 fw-bold mb-0'>
                    Serve aiuto?
                </p>
                <p className='textDarkGray' style={{fontSize: "12px"}}>
                Istruzioni dettagliate sull'installazione del codice di tracciamento sono disponibili 
                <span style={{fontSize: "12px"}} className='pClick'> qui</span>.Suggerimenti per la convalida dell'installazione del codice di tracciamento sono disponibili  
                <span style={{fontSize: "12px"}} className='pClick'> qui</span>.
                </p>
            </div>
      
        </div>
  


    </div>
  );
};

export default Tracking;

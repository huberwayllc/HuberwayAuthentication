import React, { useState } from 'react';
import "./SettingsProfile.css";

const BrandIdentity = () => {


  return (
    <div className='p-2'>

    <div style={{borderBottom: "1px black solid"}} className='text-start d-flex justify-content-between align-items-start pb-3'>
      <div>
        <h1>Identità del brand</h1>
        <p className='textDarkGray'>Le impostazioni di sincronizzazione e-mail sono condivise tra form pop-up e form esterni a Huberway.</p>
        
      </div>
    </div>

    <div className='w-100 d-flex flex-column mt-4'>
        <div style={{backgroundColor: "white"}} className='p-3 boxShadow1 rounded-1'>
            <h3 className='h2Style'>Identità del brand <span className='textPrimary'>Beta</span> </h3>
            <p className='textDarkGray'>L'aggiornamento del brand qui fornirà più input ai contenuti creati da te e dal tuo team su HubSpot, a garanzia di una comunicazione del brand coerente ed efficace a ogni interazione.</p>
        </div>
    </div>

    <div className='w-100 d-flex flex-column mt-4'>
        <div style={{backgroundColor: "white"}} className='p-3 pb-4 boxShadow1 rounded-1'>
            <h3 className='mt-0 h2Style'>Kit del brand</h3>
            <p className='textDarkGray'>Imposta il logo e i colori per gli strumenti in cui puoi mostrare il tuo branding. Queste impostazioni ti consentiranno di scegliere rapidamente le opzioni del brand quando crei contenuti rivolti al pubblico.</p>
            
            <div className="px-0 mt-3 rounded-1 colorBorder">
                <div className="py-3 colorBorder border-top-0 border-start-0 border-end-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-3 ms-2">
                            <p className="pClick mb-0">Loghi</p>
                        </div>
                        <div className="col">
                            <p className="mb-0 textDarkGray">non hai ancora aggiunto nessun logo.</p>
                        </div>
                    </div>
                </div>

                <div className="py-3 colorBorder border-top-0 border-start-0 border-end-0 " >
                    <div className="row d-flex align-items-center">
                        <div className="col-3 ms-2">
                            <p className="pClick mb-0">Favicon</p>
                        </div>
                        <div className="col">
                            <p className="mb-0 textDarkGray">non hai aggiunto ancora nessun favicon.</p>
                        </div>
                    </div>
                </div>

                <div className="py-3 colorBorder border-top-0 border-start-0 border-end-0" >
                    <div className="row d-flex align-items-center">
                        <div className="col-3 ms-2">
                            <p className="pClick mb-0">Colori</p>
                        </div>
                        <div className="col">
                            <p className="mb-0 textDarkGray">non hai aggiunto ancora nessun colore.</p>
                        </div>
                    </div>
                </div>

                <div className="py-3">
                    <div className="row d-flex align-items-center">
                        <div className="col-3 ms-2">
                            <p className="pClick mb-0">Tema</p>
                        </div>
                        <div className="col">
                            <p className="mb-0 textDarkGray">non hai acora aggiunto un tema.</p>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    </div>

    </div>
  );
};

export default BrandIdentity;

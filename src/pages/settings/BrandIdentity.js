import React, { useState } from 'react';
import "./SettingsProfile.css";

const BrandIdentity = () => {


  return (
    <div className='p-2'>

    <div style={{borderBottom: "1px black solid"}} className='text-start d-flex justify-content-between align-items-start pb-3'>
      <div>
        <h1>Identità del brand</h1>
        <p>Le impostazioni di sincronizzazione e-mail sono condivise tra form pop-up e form esterni a Huberway.</p>
        
      </div>
    </div>

    <div className='w-100 d-flex flex-column mt-4'>
        <div style={{backgroundColor: "white"}} className='p-3 boxShadow1 rounded-1'>
            <h3 style={{fontWeight: "600"}}>Identità del brand <span className='pClick'>Beta</span> </h3>
            <p>L'aggiornamento del brand qui fornirà più input ai contenuti creati da te e dal tuo team su HubSpot, a garanzia di una comunicazione del brand coerente ed efficace a ogni interazione.</p>
        </div>
    </div>

    <div className='w-100 d-flex flex-column mt-4'>
        <div style={{backgroundColor: "white"}} className='p-3 pb-4 boxShadow1 rounded-1'>
            <h3 style={{fontWeight: "600"}} className='mt-0'>Kit del brand</h3>
            <p>Imposta il logo e i colori per gli strumenti in cui puoi mostrare il tuo branding. Queste impostazioni ti consentiranno di scegliere rapidamente le opzioni del brand quando crei contenuti rivolti al pubblico.</p>
            
            <div className="px-0 mt-3 rounded-1 colorBorder">
                <div className="py-3 colorBorder border-top-0 border-start-0 border-end-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-3 ms-2">
                            <p className="textPrimary mb-0">Loghi</p>
                        </div>
                        <div className="col">
                            <p className="mb-0">non hai ancora aggiunto nessun logo.</p>
                        </div>
                    </div>
                </div>

                <div className="py-3 colorBorder border-top-0 border-start-0 border-end-0 " >
                    <div className="row d-flex align-items-center">
                        <div className="col-3 ms-2">
                            <p className="textPrimary mb-0">Favicon</p>
                        </div>
                        <div className="col">
                            <p className="mb-0">non hai aggiunto ancora nessun favicon.</p>
                        </div>
                    </div>
                </div>

                <div className="py-3 colorBorder border-top-0 border-start-0 border-end-0" >
                    <div className="row d-flex align-items-center">
                        <div className="col-3 ms-2">
                            <p className="textPrimary mb-0">Colori</p>
                        </div>
                        <div className="col">
                            <p className="mb-0">non hai aggiunto ancora nessun colore.</p>
                        </div>
                    </div>
                </div>

                <div className="py-3">
                    <div className="row d-flex align-items-center">
                        <div className="col-3 ms-2">
                            <p className="textPrimary mb-0">Tema</p>
                        </div>
                        <div className="col">
                            <p className="mb-0">non hai acora aggiunto un tema.</p>
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

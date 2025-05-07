import React, { useState } from 'react';
import "./SettingsProfile.css";
import TrackingMenu from '../../components/settings/TrackingMenu';
import { Switch, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AdvancedTracking = () => {

  const [checked, setChecked] = useState(false);

  const [autoLinking, setAutoLinking] = useState(false);
  const [limitTrackingDomains, setLimitTrackingDomains] = useState(false);
  const [limitCookiesSubdomains, setLimitCookiesSubdomains] = useState(false);
  const [secureCookies, setSecureCookies] = useState(false);
  const [botFilter, setBotFilter] = useState(false);
  const [intentDataAccess, setIntentDataAccess] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className='p-2'>
      <h1>Tracciamento di rapporti e analisi dati</h1>

      <TrackingMenu />

      <div className='mt-4'>
        <h3 className='mb-0 fw-bold'>Domini sito aggiuntivi</h3>
        <p className='mt-0 textDarkGray'>
          Crea nuovi utenti, personalizza le autorizzazioni utente e rimuovi utenti dal tuo account.
          Scopri di più sulle autorizzazioni utente
        </p>
      </div>

      <div className='mt-4 container'>
        <div className='row colorBorder py-2'>
          <div className='col-8'>
            <p className='fw-bold textDarkGray m-0'>DOMINIO</p>
          </div>
          <div className='col-4 m-0'>
            <p className='fw-bold textDarkGray m-0'>TIPO</p>
          </div>
        </div>

        <div className='row colorBorder py-3 border-top-0 bg-white'>
          <div className='col-8'>
            <p className=' textDarkGray m-0'>146003500.hs-sites-eu1.com</p>
          </div>
          <div className='col-4 m-0'>
            <p className=' textDarkGray m-0'>Ospitato</p>
          </div>
        </div>

        <div className='row colorBorder py-3 border-top-0'>
          <div className='col-8 d-flex align-items-center'>
          <AddIcon className='pClick' style={{fontSize: "21px"}}/>
            <p className='fw-bold pClick m-0'>Aggiungi dominio</p>
          </div>
          <div className='col-4 m-0'>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <div style={{backgroundColor: "white" }} className='d-flex justify-content-between align-items-center pt-2 pb-3 px-3 colorBorder'>
          <div>
            <h4 className='m-0'>Collegamento automatico tra domini</h4>
            <p className='m-0 textDarkGray'>Modifica il link sui siti per abilitare il tracciamento dei link tra i domini</p>
          </div>
          <div>
          <FormControlLabel
              control={<Switch checked={autoLinking} onChange={(e) => setAutoLinking(e.target.checked)} />}
            />
          </div>
        </div>

        <div style={{backgroundColor: "white" }} className='d-flex justify-content-between gap-3 align-items-center pt-2 pb-3 px-3 colorBorder border-top-0'>
          <div>
            <h4 className='m-0'>Limita tracciamento a questi domini</h4>
            <p className='m-0 textDarkGray'>Consenti tracciamento solo sui domini elencati qui.</p>
          </div>
          <div>
          <FormControlLabel
              control={<Switch checked={limitTrackingDomains} onChange={(e) => setLimitTrackingDomains(e.target.checked)} />}
            />
          </div>
        </div>

        <div style={{backgroundColor: "white" }} className='d-flex justify-content-between gap-3 align-items-center pt-2 pb-3 px-3 colorBorder border-top-0'>
          <div>
            <h4 className='m-0'>Limita cookie ai sottodomini</h4>
            <p className='m-0 textDarkGray'>Limita il cookie di tracciamento HubSpot al sottodominio che lo inserisce. Diversamente dal dominio principale completo. Ciò significa che un elemento simile a blog.yourcompany.com potrebbe essere il referrer nello strumento delle fonti, anziché yourcompany.com.</p>
          </div>
          <div>
          <FormControlLabel
              control={<Switch checked={limitCookiesSubdomains} onChange={(e) => setLimitCookiesSubdomains(e.target.checked)} />}
            />
          </div>
        </div>

        <div style={{backgroundColor: "white" }} className='d-flex justify-content-between gap-3 align-items-center pt-2 pb-3 px-3 colorBorder border-top-0'>
          <div>
            <h4 className='m-0'>Utilizza solo cookie sicuri</h4>
            <p className='m-0 textDarkGray'>Utilizza solo il cookie di tracciamento HubSpot su pagine con una connessione sicura. Funziona solo su pagine che usano HTTPS.</p>
          </div>
          <div>
          <FormControlLabel
              control={<Switch checked={secureCookies} onChange={(e) => setSecureCookies(e.target.checked)} />}
            />
          </div>
        </div>

        <div style={{backgroundColor: "white" }} className='d-flex justify-content-between gap-3 align-items-center pt-2 pb-3 px-3 colorBorder border-top-0'>
          <div>
            <h4 className='m-0'>Filtro bot</h4>
            <p className='m-0 textDarkGray'>Filtra tutte le attività dei bot internet noti.</p>
          </div>
          <div>
          <FormControlLabel
              control={<Switch checked={botFilter} onChange={(e) => setBotFilter(e.target.checked)} />}
            />
          </div>
        </div>

        <div style={{backgroundColor: "white" }} className='d-flex justify-content-between gap-3 align-items-center pt-2 pb-3 px-3 colorBorder border-top-0'>
          <div>
            <h4 className='m-0'>Accesso ai dati sull'intento</h4>
            <p className='m-0 textDarkGray'>Abilita le funzionalità di intento e condivisione dati per il tuo account. Puoi consultare questo articolo della Knowledge Base per scoprire di più sui dati raccolti da HubSpot tramite il codice di tracciamento HubSpot.</p>
          </div>
          <div>
          <FormControlLabel
              control={<Switch checked={intentDataAccess} onChange={(e) => setIntentDataAccess(e.target.checked)} />}
            />
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='fw-bold m-0'>Esclude traffico</h3>
        <p style={{fontSize: "12px"}} className='m-0'>L'indirizzo IP</p>
        <p>95.248.218.172</p>

        <div className='mt-4'>
          <h6 className='fw-bold m-0' style={{fontSize: "13px", color: "black"}}>Indirizzi IP da escludere: </h6>
          <p style={{fontSize: "12px"}} className='fw-bold textGray'>Utilizza le virgole per separare diversi indirizzi IP. Ad esempio: 63.139.127.5, 63.139.127.23</p>
          <p style={{fontSize: "12px"}} className='fw-bold textGray'>Utilizza i trattini per rappresentare interi intervalli di indirizzi IP. Ad esempio: 63.139.127.0 - 63.139.127.255</p>
          <textarea className='textArea'
            placeholder=""
          />
        </div>

        <div className='mt-4'>
          <h6 className='fw-bold m-0' style={{fontSize: "13px", color: "black"}}>Da questi referrer: </h6>
          <p style={{fontSize: "12px"}} className='fw-bold textGray'>Utilizza le virgole per separare diversi domini referrer o indirizzi IP referrer. Ad esempio, l'aggiunta di hubspot.com filtrerà il traffico dei referral da qualsiasi URL hubspot.com e l'aggiunta di 127.0.0.1 filtrerà il traffico dei referral da qualsiasi URL 127.0.0.1 (ad esempio, 127.0.0.1/home).</p>
          <p style={{fontSize: "12px"}} className='fw-bold textGray'>Consulta questo articolo di assistenza per ulteriori informazioni sul filtro dei referrer.</p>
          <textarea className='textArea'
            placeholder=""
          />
        </div>
      </div>

    </div>
  );
};

export default AdvancedTracking;

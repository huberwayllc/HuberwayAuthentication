import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBarSettings.css';
import SearchIcon from '@mui/icons-material/Search';
import SubMenuSettings from './SubMenuSettings';
import CheckIcon from '@mui/icons-material/Check';

const SidebarSettings = () => {
  const location = useLocation();

  const navStyle = (paths) => {
    const isActive = Array.isArray(paths)
      ? paths.includes(location.pathname)
      : location.pathname === paths;
  
    return {
      padding: '10px 15px',
      backgroundColor: isActive ? '#1e7afc' : 'transparent',
      borderLeft: isActive ? '4px solid #014FC4' : 'none',
      fontWeight: isActive ? '700' : '500',
      textDecoration: 'none',
      color: isActive ? '#FFFFFF' : "#333",
      display: 'block',
      zIndex: 1,
    };
  };

  return (
<div className='boxShadow1' style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '250px',
  height: '100vh',
  background: 'white',
  borderLeft: '2px solid #ddd',
  padding: '20px',
  boxSizing: 'border-box',
  overflowY: 'auto',
  zIndex: 1
}}>
      <div style={{marginTop: "60px"}} className='d-flex align-items-center gap-2 mb-4'>
        <h2 className='m-1'>Impostazioni</h2>
        <SearchIcon />
      </div>

      {/* Sezione "Le tue preferenze" */}
      <div className='navi'>
        <h4>Le tue preferenze</h4>
        {/* 
        <Link to="/settings/user-preferences/profile" style={navStyle(['/account/settings/user-preferences/profile', '/account/settings/user-preferences/email', '/account/settings/user-preferences/security'])} >Generale</Link>
        */}

        <Link to="/account/settings/user-preferences/profile" style={navStyle(['/account/settings/user-preferences/profile'])} >Profilo</Link>
        <Link to="/account/settings/user-preferences/email" style={navStyle(['/account/settings/user-preferences/email'])} >E-mail</Link>
        <Link to="/account/settings/user-preferences/security" style={navStyle(['/account/settings/user-preferences/security'])} >Sicurezza</Link>
        </div>

      <div className='navi'>
        <h4>Gestione Account</h4>
        <Link to="/account/settings/account-managament/users-team/users" style={navStyle(['/account/settings/account-managament/users-team/users'])}
        >Utenti</Link>
        <Link to="/account/settings/account-managament/users-team/roles" style={navStyle(['/account/settings/account-managament/users-team/roles'])}
        >Ruoli</Link>
        <Link to="/account/settings/account-managament/users-team/team" style={navStyle(['/account/settings/account-managament/users-team/team'])}
        >Team</Link>
        {/* 
        <Link to="/account/settings/account-managament/users-team/users" style={navStyle(['/account/settings/account-managament/users-team/users', '/account/settings/account-managament/users-team/team'])}
        >Utenti e Team</Link>
        <SubMenuSettings 
          title="Integrazioni"
          links={[
            { 
              path: '/account/settings/account-managament/integration/connected-apps',
              label: 'App connesse',
              style: navStyle([
                '/account/settings/account-managament/integration/connected-apps',
                '/account/settings/account-managament/integration/connected-apps/alerts'
              ])
            },

            { path: '/account/settings/account-managament/integration/private-apps', label: 'App private', style: navStyle('/account/settings/account-managament/integration/private-apps') },
            { path: '/account/settings/account-managament/integration/email-service-provider', label: 'Provider di servizi e-mail', style: navStyle('/account/settings/account-managament/integration/email-service-provider') },
          ]}
        />
         <Link to="/account/settings/account-managament/brand-identity" style={navStyle('/account/settings/account-managament/brand-identity')}>Identità del brand</Link>
         <Link to="/account/settings/account-managament/tracking"style={navStyle(['/account/settings/account-managament/tracking', '/account/settings/account-managament/advanced-tracking'])}>Codice di tracciamento</Link>
         */}
      </div>

    {/* 

      <div className='navi'>
        <h4>Gestione account</h4>
        <Link to="/account/settings/notifications" style={navStyle('/account/settings/notifications')}>
          Impostazioni predefinite dell'account
        </Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Log di audit</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Utenti e team</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Aggiornamenti sui prodotti</Link>

        <SubMenuSettings 
          title="Integrazioni"
          links={[
            { path: '/account/settings/integrations/zapier', label: 'App connesse', style: navStyle('/account/settings/integrations/zapier') },
            { path: '/account/settings/integrations/slack', label: 'App private', style: navStyle('/account/settings/integrations/slack') },
            { path: '/account/settings/integrations/shopify', label: 'Provider di servizi e-mail', style: navStyle('/account/settings/integrations/shopify') },
          ]}
        />
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Download del marketplace</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Codice di tracciamento</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Privacy e consenso</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Sicurezza</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>IA</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Commercio</Link>
      </div>


      <div className='navi'>
        <h4>Gestione dati</h4>
        <Link to="/account/settings/notifications" style={navStyle('/account/settings/notifications')}>
          Impostazioni predefinite dell'account
        </Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Proprietà</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Libreria oggetti</Link>

        <SubMenuSettings 
          title="Oggetti"
          links={[
            { path: '/account/settings/integrations/contacts', label: 'Contatti', style: navStyle('/account/settings/integrations/contacts') },
            { path: '/account/settings/integrations/companies', label: 'Aziende', style: navStyle('/account/settings/integrations/companies') },
            { path: '/account/settings/integrations/lead', label: 'Lead', style: navStyle('/account/settings/integrations/lead') },
            { path: '/account/settings/integrations/deals', label: 'Trattative', style: navStyle('/account/settings/integrations/deals') },
            { path: '/account/settings/integrations/tickets', label: 'Ticket', style: navStyle('/account/settings/integrations/tickets') },
            { path: '/account/settings/integrations/products', label: 'Prodotti', style: navStyle('/account/settings/integrations/products') },
            { path: '/account/settings/integrations/quotes', label: 'Preventivi', style: navStyle('/account/settings/integrations/quotes') },
            { path: '/account/settings/integrations/subscriptions', label: 'Abbonamenti', style: navStyle('/account/settings/integrations/subscriptions') },
            { path: '/account/settings/integrations/services', label: 'Servizi', style: navStyle('/account/settings/integrations/services') },
            { path: '/account/settings/integrations/courses', label: 'Corsi', style: navStyle('/account/settings/integrations/courses') },
            { path: '/account/settings/integrations/prospects', label: 'Prospetti', style: navStyle('/account/settings/integrations/prospects') },
            { path: '/account/settings/integrations/appointments', label: 'Appuntamenti', style: navStyle('/account/settings/integrations/appointments') },
            { path: '/account/settings/integrations/invoices', label: 'Fatture', style: navStyle('/account/settings/integrations/invoices') },
            { path: '/account/settings/integrations/activities', label: 'Attività', style: navStyle('/account/settings/integrations/activities') },
            { path: '/account/settings/integrations/lists', label: 'Elenchi', style: navStyle('/account/settings/integrations/lists') },
            { path: '/account/settings/integrations/marketing-events', label: 'Eventi di marketing', style: navStyle('/account/settings/integrations/marketing-events') },
            { path: '/account/settings/integrations/orders', label: 'Ordini', style: navStyle('/account/settings/integrations/orders') },
            { path: '/account/settings/integrations/carts', label: 'Carrelli', style: navStyle('/account/settings/integrations/carts') },
            { path: '/account/settings/integrations/custom-items', label: 'Oggetti personalizzati', style: navStyle('/account/settings/integrations/custom-items') },
          ]}
        />

        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Traduzione</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Arricchimenti dei dati</Link>
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Importazione de esportazione</Link>
      </div>



      <div className='navi'>
        <h4>Strumenti</h4>
        <Link to="/account/settings/notifications" style={navStyle('/account/settings/notifications')}>Riunioni</Link>

        <SubMenuSettings 
          title="Chiamata Huberway"
          links={[
            { path: '/account/settings/integrations/call-configuration', label: 'Configurazione chiamata', style: navStyle('/account/settings/integrations/call-configuration') },
            { path: '/account/settings/integrations/blocked-numbers', label: 'Elenco numeri bloccati', style: navStyle('/account/settings/integrations/blocked-numbers') },
            { path: '/account/settings/integrations/ivr', label: 'Risposta vocale interattiva', style: navStyle('/account/settings/integrations/ivr') },
            { path: '/account/settings/integrations/transcription', label: 'Trascrizione e analisi', style: navStyle('/account/settings/integrations/transcription') },
          ]}
        />

        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Area di lavoro delle vendite</Link>

        <SubMenuSettings 
          title="Casella di posta in arrivo"
          links={[
            { path: '/account/settings/integrations/inbox', label: 'Caselle di posta in arrivo', style: navStyle('/account/settings/integrations/inbox') },
            { path: '/account/settings/integrations/availability', label: 'Gestione della disponibilità', style: navStyle('/account/settings/integrations/availability') },
            { path: '/account/settings/integrations/inclusion-exclusion', label: 'Elenco di inclusione ed esclusione', style: navStyle('/account/settings/integrations/inclusion-exclusion') },
          ]}
        />

        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Customer success</Link>

        <SubMenuSettings 
          title="Marketing"
          links={[
            { path: '/account/settings/integrations/announcements', label: 'Annunci', style: navStyle('/account/settings/integrations/announcements') },
            { path: '/account/settings/integrations/email', label: 'E-mail', style: navStyle('/account/settings/integrations/email') },
            { path: '/account/settings/integrations/forms', label: 'Form', style: navStyle('/account/settings/integrations/forms') },
          ]}
        />

        <SubMenuSettings 
          title="Contenuti"
          links={[
            { path: '/account/settings/integrations/domains', label: 'Domini e URL', style: navStyle('/account/settings/integrations/domains') },
            { path: '/account/settings/integrations/navigation', label: 'Menu di navigazione', style: navStyle('/account/settings/integrations/navigation') },
            { path: '/account/settings/integrations/themes', label: 'Temi e moduli', style: navStyle('/account/settings/integrations/themes') },
            { path: '/account/settings/integrations/blog', label: 'Blog', style: navStyle('/account/settings/integrations/blog') },
            { path: '/account/settings/integrations/pages', label: 'Pagine', style: navStyle('/account/settings/integrations/pages') },
          ]}
        />
        <Link to="/account/settings/preferences" style={navStyle('/account/settings/preferences')}>Pagamenti</Link>
      </div>
      */}

    </div>
  );
};

export default SidebarSettings;

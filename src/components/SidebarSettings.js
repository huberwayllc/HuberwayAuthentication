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
        <Link to="/settings/user-preferences/profile" style={navStyle(['/settings/user-preferences/profile', '/settings/user-preferences/email', '/settings/user-preferences/security'])} >Generale</Link>
        */}

        <Link to="/settings/user-preferences/profile" style={navStyle(['/settings/user-preferences/profile'])} >Profilo</Link>
        <Link to="/settings/user-preferences/email" style={navStyle(['/settings/user-preferences/email'])} >E-mail</Link>
        <Link to="/settings/user-preferences/security" style={navStyle(['/settings/user-preferences/security'])} >Sicurezza</Link>
        </div>

      <div className='navi'>
        <h4>Gestione Account</h4>
        <Link to="/settings/account-managament/users-team/users" style={navStyle(['/settings/account-managament/users-team/users'])}
        >Utenti</Link>
        <Link to="/settings/account-managament/users-team/roles" style={navStyle(['/settings/account-managament/users-team/roles'])}
        >Ruoli</Link>
        <Link to="/settings/account-managament/users-team/team" style={navStyle(['/settings/account-managament/users-team/team'])}
        >Team</Link>
        {/* 
        <Link to="/settings/account-managament/users-team/users" style={navStyle(['/settings/account-managament/users-team/users', '/settings/account-managament/users-team/team'])}
        >Utenti e Team</Link>
        <SubMenuSettings 
          title="Integrazioni"
          links={[
            { 
              path: '/settings/account-managament/integration/connected-apps',
              label: 'App connesse',
              style: navStyle([
                '/settings/account-managament/integration/connected-apps',
                '/settings/account-managament/integration/connected-apps/alerts'
              ])
            },

            { path: '/settings/account-managament/integration/private-apps', label: 'App private', style: navStyle('/settings/account-managament/integration/private-apps') },
            { path: '/settings/account-managament/integration/email-service-provider', label: 'Provider di servizi e-mail', style: navStyle('/settings/account-managament/integration/email-service-provider') },
          ]}
        />
         <Link to="/settings/account-managament/brand-identity" style={navStyle('/settings/account-managament/brand-identity')}>Identità del brand</Link>
         <Link to="/settings/account-managament/tracking"style={navStyle(['/settings/account-managament/tracking', '/settings/account-managament/advanced-tracking'])}>Codice di tracciamento</Link>
         */}
      </div>

    {/* 

      <div className='navi'>
        <h4>Gestione account</h4>
        <Link to="/settings/notifications" style={navStyle('/settings/notifications')}>
          Impostazioni predefinite dell'account
        </Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Log di audit</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Utenti e team</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Aggiornamenti sui prodotti</Link>

        <SubMenuSettings 
          title="Integrazioni"
          links={[
            { path: '/settings/integrations/zapier', label: 'App connesse', style: navStyle('/settings/integrations/zapier') },
            { path: '/settings/integrations/slack', label: 'App private', style: navStyle('/settings/integrations/slack') },
            { path: '/settings/integrations/shopify', label: 'Provider di servizi e-mail', style: navStyle('/settings/integrations/shopify') },
          ]}
        />
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Download del marketplace</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Codice di tracciamento</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Privacy e consenso</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Sicurezza</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>IA</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Commercio</Link>
      </div>


      <div className='navi'>
        <h4>Gestione dati</h4>
        <Link to="/settings/notifications" style={navStyle('/settings/notifications')}>
          Impostazioni predefinite dell'account
        </Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Proprietà</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Libreria oggetti</Link>

        <SubMenuSettings 
          title="Oggetti"
          links={[
            { path: '/settings/integrations/contacts', label: 'Contatti', style: navStyle('/settings/integrations/contacts') },
            { path: '/settings/integrations/companies', label: 'Aziende', style: navStyle('/settings/integrations/companies') },
            { path: '/settings/integrations/lead', label: 'Lead', style: navStyle('/settings/integrations/lead') },
            { path: '/settings/integrations/deals', label: 'Trattative', style: navStyle('/settings/integrations/deals') },
            { path: '/settings/integrations/tickets', label: 'Ticket', style: navStyle('/settings/integrations/tickets') },
            { path: '/settings/integrations/products', label: 'Prodotti', style: navStyle('/settings/integrations/products') },
            { path: '/settings/integrations/quotes', label: 'Preventivi', style: navStyle('/settings/integrations/quotes') },
            { path: '/settings/integrations/subscriptions', label: 'Abbonamenti', style: navStyle('/settings/integrations/subscriptions') },
            { path: '/settings/integrations/services', label: 'Servizi', style: navStyle('/settings/integrations/services') },
            { path: '/settings/integrations/courses', label: 'Corsi', style: navStyle('/settings/integrations/courses') },
            { path: '/settings/integrations/prospects', label: 'Prospetti', style: navStyle('/settings/integrations/prospects') },
            { path: '/settings/integrations/appointments', label: 'Appuntamenti', style: navStyle('/settings/integrations/appointments') },
            { path: '/settings/integrations/invoices', label: 'Fatture', style: navStyle('/settings/integrations/invoices') },
            { path: '/settings/integrations/activities', label: 'Attività', style: navStyle('/settings/integrations/activities') },
            { path: '/settings/integrations/lists', label: 'Elenchi', style: navStyle('/settings/integrations/lists') },
            { path: '/settings/integrations/marketing-events', label: 'Eventi di marketing', style: navStyle('/settings/integrations/marketing-events') },
            { path: '/settings/integrations/orders', label: 'Ordini', style: navStyle('/settings/integrations/orders') },
            { path: '/settings/integrations/carts', label: 'Carrelli', style: navStyle('/settings/integrations/carts') },
            { path: '/settings/integrations/custom-items', label: 'Oggetti personalizzati', style: navStyle('/settings/integrations/custom-items') },
          ]}
        />

        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Traduzione</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Arricchimenti dei dati</Link>
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Importazione de esportazione</Link>
      </div>



      <div className='navi'>
        <h4>Strumenti</h4>
        <Link to="/settings/notifications" style={navStyle('/settings/notifications')}>Riunioni</Link>

        <SubMenuSettings 
          title="Chiamata Huberway"
          links={[
            { path: '/settings/integrations/call-configuration', label: 'Configurazione chiamata', style: navStyle('/settings/integrations/call-configuration') },
            { path: '/settings/integrations/blocked-numbers', label: 'Elenco numeri bloccati', style: navStyle('/settings/integrations/blocked-numbers') },
            { path: '/settings/integrations/ivr', label: 'Risposta vocale interattiva', style: navStyle('/settings/integrations/ivr') },
            { path: '/settings/integrations/transcription', label: 'Trascrizione e analisi', style: navStyle('/settings/integrations/transcription') },
          ]}
        />

        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Area di lavoro delle vendite</Link>

        <SubMenuSettings 
          title="Casella di posta in arrivo"
          links={[
            { path: '/settings/integrations/inbox', label: 'Caselle di posta in arrivo', style: navStyle('/settings/integrations/inbox') },
            { path: '/settings/integrations/availability', label: 'Gestione della disponibilità', style: navStyle('/settings/integrations/availability') },
            { path: '/settings/integrations/inclusion-exclusion', label: 'Elenco di inclusione ed esclusione', style: navStyle('/settings/integrations/inclusion-exclusion') },
          ]}
        />

        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Customer success</Link>

        <SubMenuSettings 
          title="Marketing"
          links={[
            { path: '/settings/integrations/announcements', label: 'Annunci', style: navStyle('/settings/integrations/announcements') },
            { path: '/settings/integrations/email', label: 'E-mail', style: navStyle('/settings/integrations/email') },
            { path: '/settings/integrations/forms', label: 'Form', style: navStyle('/settings/integrations/forms') },
          ]}
        />

        <SubMenuSettings 
          title="Contenuti"
          links={[
            { path: '/settings/integrations/domains', label: 'Domini e URL', style: navStyle('/settings/integrations/domains') },
            { path: '/settings/integrations/navigation', label: 'Menu di navigazione', style: navStyle('/settings/integrations/navigation') },
            { path: '/settings/integrations/themes', label: 'Temi e moduli', style: navStyle('/settings/integrations/themes') },
            { path: '/settings/integrations/blog', label: 'Blog', style: navStyle('/settings/integrations/blog') },
            { path: '/settings/integrations/pages', label: 'Pagine', style: navStyle('/settings/integrations/pages') },
          ]}
        />
        <Link to="/settings/preferences" style={navStyle('/settings/preferences')}>Pagamenti</Link>
      </div>
      */}

    </div>
  );
};

export default SidebarSettings;

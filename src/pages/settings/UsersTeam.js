import React, { useState } from 'react';
import "./SettingsProfile.css";
import UserStatsBox from '../../components/settings/UserStatsBox';
import UserFiltersWithTable from '../../components/settings/UserFiltersWithTable';
import UsersTeamMenu from '../../components/settings/UsersTeamMenu';
import UserFormModal from '../../components/settings/UserFormModal';


const SettingsUsersTeam = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  // Campi form nuovo utente
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [timezone, setTimezone] = useState('UTC');
  const [locale, setLocale] = useState('en');
  const [dateFormat, setDateFormat] = useState('d/m/Y [09/05/2025]');
  const [timeFormat, setTimeFormat] = useState('24h');

  const [enableSuperAdmin, setEnableSuperAdmin] = useState(false);
  const [allowApiTokens, setAllowApiTokens] = useState(false);

  const handleCreateUser = () => {
    setOpenModal(false);
  };

  return (
    <div className='p-2'>
      <h1>Utenti e Team</h1>

      <UsersTeamMenu />

      <div className='mt-2'>
        <p className='mt-4 textDarkGray'>
          Crea nuovi utenti, personalizza le autorizzazioni utente e rimuovi utenti dal tuo account.
          Scopri di più sulle autorizzazioni utente
        </p>
      </div>

      <UserStatsBox />

      <UserFiltersWithTable onCreateUser={() => setOpenModal(true)} />

      <UserFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        userName={userName}
        setUserName={setUserName}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userRole={userRole}
        setUserRole={setUserRole}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        timezone={timezone}
        setTimezone={setTimezone}
        locale={locale}
        setLocale={setLocale}
        dateFormat={dateFormat}
        setDateFormat={setDateFormat}
        timeFormat={timeFormat}
        setTimeFormat={setTimeFormat}
        enableSuperAdmin={enableSuperAdmin}
        setEnableSuperAdmin={setEnableSuperAdmin}
        allowApiTokens={allowApiTokens}
        setAllowApiTokens={setAllowApiTokens}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default SettingsUsersTeam;

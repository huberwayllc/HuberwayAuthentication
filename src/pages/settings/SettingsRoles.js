import React, { useState } from 'react';
import "./SettingsProfile.css";
import UsersTeamMenu from '../../components/settings/UsersTeamMenu';
import RoleFormModal from '../../components/settings/RoleFormModal';

const SettingsRoles = () => {
  const [openModal, setOpenModal] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [application, setApplication] = useState('');

  const handleCreateRole = () => {
    // TODO: salvataggio del ruolo
    setOpenModal(false);
  };

  return (
    <div className='p-2'>
      <h1>Ruoli</h1>
      <UsersTeamMenu />

      <div className='d-flex justify-content-end gap-4'>
        <input placeholder='Search..' style={{ width: "250px" }} className='inp' />
        <button className='btn btn-primary' onClick={() => setOpenModal(true)}>Crea un ruolo</button>
      </div>

      <div className='text-start mt-4'>
        <h2>Imposta le autorizzazioni del ruolo</h2>
        <p>Mantieni il tuo team organizzato ed efficiente assicurandoti che ogni utente abbia accesso ai giusti asset</p>
        <p>Vuoi scoprire di più? Informazioni sui team</p>
      </div>

      <RoleFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        roleName={roleName}
        setRoleName={setRoleName}
        application={application}
        setApplication={setApplication}
        onSubmit={handleCreateRole}
      />
    </div>
  );
};

export default SettingsRoles;

import React, { useState } from 'react';
import "./SettingsProfile.css";
import UsersTeamMenu from '../../components/settings/UsersTeamMenu';
import TeamFormModal from '../../components/settings/TeamFormModal';

const SettingsTeam = () => {
  const [openModal, setOpenModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [manager, setManager] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    console.log({ teamName, manager, members, description });
    setOpenModal(false);
  };

  return (
    <div className='p-2'>
      <h1>Team</h1>
        {/*  <UsersTeamMenu /> */}

      <div className='d-flex justify-content-end gap-4'>
        <input placeholder='Search..' style={{ width: "250px" }} className='inp' />
        <button className='btn btn-primary' onClick={() => setOpenModal(true)}>Crea Team</button>
      </div>

      <div className='text-start mt-4'>
        <h2>Imposta le autorizzazioni del team</h2>
        <p>Mantieni il tuo team organizzato ed efficiente assicurandoti che ogni utente abbia accesso ai giusti asset</p>
        <p>Vuoi scoprire di più? Informazioni sui team</p>
      </div>

      <TeamFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        teamName={teamName}
        setTeamName={setTeamName}
        manager={manager}
        setManager={setManager}
        members={members}
        setMembers={setMembers}
        description={description}
        setDescription={setDescription}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default SettingsTeam;

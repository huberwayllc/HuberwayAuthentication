import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 500,
  height: '100vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 0,
  p: 4,
};

const TeamFormModal = ({
  open,
  onClose,
  teamName,
  setTeamName,
  manager,
  setManager,
  members,
  setMembers,
  description,
  setDescription,
  onSubmit
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <div className='position-relative h-100'>
          {/* Header */}
          <div className='d-flex justify-content-between align-items-start'>
            <Typography variant="h6" gutterBottom>
              Crea un nuovo Team
            </Typography>
            <IconButton onClick={onClose} style={{ padding: 0 }}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Form */}
          <Box sx={{ mt: 3 }}>
            <label className='labInp'>Nome Team</label>
            <input
              className='inp w-100 mb-20'
              placeholder="Nome Team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />

            <label className='labInp'>Manager</label>
            <input
              className='inp w-100 mb-20'
              placeholder="Manager"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />

            <label className='labInp'>Membri</label>
            <input
              className='inp w-100 mb-20'
              placeholder="Membri"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
            />

            <label className='labInp'>Descrizione</label>
            <textarea
              className='inp w-100'
              placeholder="Descrizione"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          {/* Footer */}
          <div className='position-absolute bottom-0 end-0 d-flex gap-2'>
            <button className='btn' onClick={onClose}>Annulla</button>
            <button className='btn btn-primary' onClick={onSubmit}>Crea</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default TeamFormModal;

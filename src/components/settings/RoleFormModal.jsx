import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: 500,
  height: '100vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const RoleFormModal = ({ open, onClose, roleName, setRoleName, application, setApplication, onSubmit }) => {
  const appOptions = [
    { value: 'CRM', label: 'CRM' },
    { value: 'ERP', label: 'ERP' },
    { value: 'Analytics', label: 'Analytics' },
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <div className='position-relative h-100'>
          <div className='d-flex justify-content-between align-items-start'>
            <Typography variant='h6' gutterBottom>Crea Ruolo</Typography>
            <IconButton onClick={onClose} style={{ padding: 0 }}>
              <CloseIcon />
            </IconButton>
          </div>

          <Box sx={{ mt: 3 }}>
            <label className='labInp'>Nome del Ruolo</label>
            <input
              type='text'
              className='inp w-100 mb-20'
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />

            <label className='labInp'>Applicazione</label>
            <TextField
              select
              fullWidth
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className='mb-20'
              size="small"
            >
              {appOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Sezione vuota per future configurazioni */}
            <div style={{ border: '1px dashed #ccc', borderRadius: 4, padding: 20, marginTop: 20 }}>
              <Typography variant='body2' color='textSecondary'>
                Altri dettagli ruolo verranno qui...
              </Typography>
            </div>
          </Box>

          <div className='position-absolute bottom-0 end-0 d-flex gap-2'>
            <button className='btn' onClick={onClose}>Annulla</button>
            <button className='btn btn-primary' onClick={onSubmit}>Crea</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default RoleFormModal;

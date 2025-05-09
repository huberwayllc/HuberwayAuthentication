import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: 670,
  height: '100vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const UserFormModal = ({
  open,
  onClose,
  tabIndex,
  setTabIndex,
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userRole,
  setUserRole,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  timezone,
  setTimezone,
  locale,
  setLocale,
  dateFormat,
  setDateFormat,
  timeFormat,
  setTimeFormat,
  enableSuperAdmin,
  setEnableSuperAdmin,
  allowApiTokens,
  setAllowApiTokens,
  onSubmit,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <div className='position-relative h-100'>
          <div className='d-flex justify-content-between align-items-start'>
            <Typography className='m-0' variant='h6' gutterBottom>
              Crea Utente
            </Typography>
            <IconButton onClick={onClose} style={{ padding: '0px' }}>
              <CloseIcon />
            </IconButton>
          </div>

          <Tabs
            value={tabIndex}
            onChange={(_, val) => setTabIndex(val)}
            variant='fullWidth'
            sx={{
              mb: 2,
              mt: 3,
              '& .MuiTab-root': {
                fontSize: '0.9rem',
                textTransform: 'none',
                fontWeight: 'bold',
                minHeight: '32px',
                paddingY: '4px',
              },
              '& .MuiTabs-indicator': {
                height: '2px',
              },
            }}
          >
            <Tab label='Utente' />
            <Tab label='Password' />
            <Tab label='Localizzazione' />
            <Tab label='Notifiche' />
            <Tab label='Avanzate' />
          </Tabs>

          {/* TAB CONTENT */}
          {tabIndex === 0 && (
            <Box>
              <label className='labInp mt-4'>Nome*</label>
              <input type='text' className='inp w-100 mb-20' value={userName} onChange={e => setUserName(e.target.value)} />
              <label className='labInp'>E-Mail*</label>
              <input type='email' className='inp w-100 mb-20' value={userEmail} onChange={e => setUserEmail(e.target.value)} />
              <label className='labInp'>Ruoli</label>
              <input type='text' className='inp w-100 mb-20' value={userRole} onChange={e => setUserRole(e.target.value)} />
            </Box>
          )}

          {tabIndex === 1 && (
            <Box>
              <label className='labInp mt-4'>Password*</label>
              <input type='password' className='inp w-100 mb-20' value={password} onChange={e => setPassword(e.target.value)} />
              <label className='labInp'>Conferma Password*</label>
              <input type='password' className='inp w-100 mb-20' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </Box>
          )}

          {tabIndex === 2 && (
            <Box>
              <label className='labInp mt-4'>Timezone</label>
              <input type='text' className='inp w-100 mb-20' value={timezone} onChange={e => setTimezone(e.target.value)} />
              <label className='labInp'>Locale</label>
              <input type='text' className='inp w-100 mb-20' value={locale} onChange={e => setLocale(e.target.value)} />
              <label className='labInp'>Date Format</label>
              <input type='text' className='inp w-100 mb-20' value={dateFormat} onChange={e => setDateFormat(e.target.value)} />
              <label className='labInp'>Time Format</label>
              <input type='text' className='inp w-100 mb-20' value={timeFormat} onChange={e => setTimeFormat(e.target.value)} />
            </Box>
          )}

          {tabIndex === 3 && <Box>{/* Notifiche (vuoto per ora) */}</Box>}

          {tabIndex === 4 && (
            <Box>
              <div className='d-flex justify-content-between align-items-center colorBorder p-3 rounded-1 mb-4'>
                <div>
                  <h6 className='mt-0'>Accesso come Super Amministratore</h6>
                  <Typography variant='body2'>
                    Abilitare l'accesso come super amministratore per l'utente garantirà l'accesso completo a tutte le funzionalità senza alcuna limitazione.
                  </Typography>
                </div>
                <FormControlLabel control={<Switch checked={enableSuperAdmin} onChange={e => setEnableSuperAdmin(e.target.checked)} />} sx={{ width: '30px' }} />
              </div>

              <div className='d-flex justify-content-between align-items-center colorBorder p-3 rounded-1'>
                <div>
                  <h6 className='mt-0'>API Tokens</h6>
                  <Typography variant='body2'>
                    Consenti all'utente di generare token API e utilizzare tali token per effettuare richieste agli endpoint dell'applicazione.
                  </Typography>
                </div>
                <FormControlLabel control={<Switch checked={allowApiTokens} onChange={e => setAllowApiTokens(e.target.checked)} />} sx={{ width: '30px' }} />
              </div>
            </Box>
          )}

          {/* ACTIONS */}
          <div className='position-absolute bottom-0 end-0 d-flex gap-2'>
            <button className='btn' onClick={onClose}>Annulla</button>
            <button className='btn btn-primary' onClick={onSubmit}>Crea</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UserFormModal;

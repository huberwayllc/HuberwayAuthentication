// Profile.js
import React, { useState } from 'react';
import SettingsMenu from "../../../components/settings/SettingsMenu";
import Avatar from '@mui/material/Avatar';
import "../SettingsProfile.css";
import CheckIcon from '@mui/icons-material/Check';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';

const SettingsSecurity = () => {
  // Stato per controllare il modal
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openRemoveAccount, setOpenRemoveAccount] = useState(false);
  const [openExitSession, setOpenExitSession] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPassword = () => setOpenPassword(true);
  const handleClosePassword = () => setOpenPassword(false);
  const handleOpenRemoveAccount = () => setOpenRemoveAccount(true);
  const handleCloseRemoveAccount= () => setOpenRemoveAccount(false);
  const handleOpenExitSession = () => setOpenExitSession(true);
  const handleCloseExitSession= () => setOpenExitSession(false);
  const handleOpenDeleteAccount = () => setOpenDeleteAccount(true);
  const handleCloseDeleteAccount= () => setOpenDeleteAccount(false);

  return (
    <>
      <div className='p-2'>
        <h1>Generale</h1>

        <SettingsMenu />
        
        <div style={{ borderBottom: "1px solid gray" }} className='mt-2'>
          <p className='mt-2 textDarkGray'>
          Queste preferenze verranno applicate solo a te. Per le impostazioni di sicurezza dell'account, vai alle impostazioni dell'account.
          </p>
        </div>

        <div className='mt-3 d-flex flex-column'>
          <h2 style={{ lineHeight: "18px" }} className='h2Style'>Sicurezza</h2>
          <p className='textDarkGray' style={{ width: "75%" }}>
            Imposta le preferenze relative all'accesso e alla sicurezza del tuo account personale.
          </p>
        </div>

        <div className='mt-4'>
          <h6 style={{ fontWeight: "bold" }} className='mt-4'>Configura</h6>
        </div>

        <div className='d-flex flex-column mb-2'>
          <input disabled={true} className='inp' placeholder='e‑mail' />

          <button style={{width: "250px"}}  onClick={handleOpen} className='btn btn-primary fs-6 p-2 mt-2'>
            Modifica indirizzo e‑mail
          </button>
        </div>

        <div className='mt-5'>
          <h6 style={{ fontWeight: "bold" }} className='mt-4'>Password</h6>
        </div>
        <div>
          <p onClick={handleOpenPassword} className='mb-0 pClick'>Reimposta password</p>
          <p style={{ fontSize: "12px" }}>Ultima reimpostazione il 09/04/2025</p>
        </div>

        <div className='mt-5'>
          <h6 style={{ fontWeight: "bold" }} className='mt-4'>Numero di telefono affidabile</h6>
        </div>
        <div>
          <p className='mb-0 pClick'>Aggiungi un numero di telefono affidabile</p>
          <p className='textDarkGray' style={{ fontSize: "12px" }}>
            Aggiungi un numero di telefono utilizzato per verificare occasionalmente la tua identità e ricevere altri avvisi relativi alla sicurezza. Questo numero di telefono non verrà mai utilizzato per scopi di vendita o marketing.
          </p>
        </div>

        <div className='mt-5'>
          <h6 style={{ fontWeight: "bold" }} className='mt-4'>Passkey</h6>
        </div>
        <div>
          <p className='mb-0 pClick'>Configura passkey</p>
          <p className='textDarkGray' style={{ fontSize: "12px" }}>
            Le passkey sostituiscono tutte le password e forniscono un accesso più sicuro, semplice e veloce in tutti i tuoi dispositivi.
          </p>
          <p className='mb-0 mt-3 pClick'>Maggiori informazioni</p>
        </div>

        <div className='mt-5'>
          <h6 style={{ fontWeight: "bold" }} className='mt-4'>Autenticazioni a due fattori (2FA)</h6>
        </div>
        <div>
          <p className='mb-0 pClick'>Configura l'autenticazione a due fattori (2FA)</p>
          <p className='textDarkGray' style={{ fontSize: "12px" }}>
            L'autenticazione a due fattori è una misura di sicurezza avanzata. Una volta abilitata, ti verrà richiesto di fornire due tipi di identificazione quando accedi a Huberway. Le app di sicurezza come Google Authenticator e gli SMS sono supportati.
          </p>
        </div>

        <div className='mt-5'>
          <h6 style={{ fontWeight: "bold" }} className='mt-4'>Ripristino della sessione</h6>
        </div>
        <div>
          <p onClick={handleOpenExitSession} className='mb-0 pClick'>Esci da tutte le sessioni</p>
          <p className='textDarkGray' style={{ fontSize: "12px" }}>
            Questa azione ti disconnetterà da tutti i dispositivi e tutte le sessioni, inclusa quella attiva.
          </p>
        </div>

        <div className='mt-5'>
          <h6 style={{ fontWeight: "bold" }} className='mt-4'>Rimuovi da questo account</h6>
        </div>
        <div>
          <p className='textDarkGray' style={{ fontSize: "14px" }}>
            Questa azione rimuoverà il tuo utente da questo account. Se fai parte di altri account, potrai ancora accedervi.
          </p>
          <Button
            className='mt-2'
            style={{ textTransform: "none", width: "300px", backgroundColor: "#F2545B" }}
            variant='contained'
            onClick={handleOpenRemoveAccount}
          >
            Rimuovimi da questo account
          </Button>
        </div>

        <div className='mt-4'>
          <h6 style={{ fontWeight: "bold" }} className='mt-4'>Rimuovi in modo permanente</h6>
        </div>
        <div>
          <Button
            className='mt-2'
            style={{ textTransform: "none", width: "300px", backgroundColor: "#F2545B" }}
            variant='contained'
            onClick={handleOpenDeleteAccount}
          >
            Elimina il mio account utente
          </Button>
        </div>
      </div>


      <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Modifica indirizzo e‑mail
            </Typography>
            <TextField
              fullWidth
              label="Nuovo indirizzo e‑mail"
              type="email"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleClose}
            >
              Conferma
            </Button>
          </Box>
        </Modal>

        <Modal open={openPassword} onClose={handleClosePassword}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Reimposta password
            </Typography>
            <TextField
              fullWidth
              label="Conferma Password attuale"
              type="password"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nuova Password"
              type="password"
              margin="normal"
            />
            <div className='mt-3'>
              <p>Lunghezza minima di 12 caratteri</p>
              <p>Un carattere in minuscolo</p>
              <p>Un carattere in maiuscolo</p>
              <p>Un numero, un simbolo, o uno spazio vuoto</p>
            </div>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleClosePassword}
            >
              Conferma
            </Button>
   
          </Box>
        </Modal>

        <Modal open={openRemoveAccount} onClose={handleCloseRemoveAccount}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" component="h2" gutterBottom style={{color: "#F2545B"}}>
              Rimuovere da questo account?
            </Typography>
            <div className='my-3'>
              <p style={{fontSize: "15px"}}>Stai per rimuovere il tuo account 
                <b>"castaldo.samuele@gmail.com"</b> da questo HubID <b>146003500</b>. Se fai parte di altri account, potrai ancora accedervi. 
                Gli altri utenti potranno ancora accedere ai dati da questo account.</p>
            </div>
            <p className='fw-bold'>
              Digita il tuo indirizzo e-mail se desideri rimuoverti da questo account.
            </p>
            <TextField
              fullWidth
               className='mt-0'
              label="Conferma e-mail attuale"
              type="email"
              margin="normal"
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleCloseRemoveAccount}
              style={{backgroundColor: "#F2545B"}}
            >
              Elimina
            </Button>
   
          </Box>
        </Modal>

        <Modal open={openDeleteAccount} onClose={handleCloseDeleteAccount}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" component="h2" gutterBottom style={{color: "#F2545B"}}>
            Eliminare l'account in modo permanente?
            </Typography>
            <div className='my-3'>
              <p style={{fontSize: "15px"}}>Stai per eliminare in modo permanente il tuo account <b>"castaldo.samuele@gmail.com"</b>.
                In questo modo verrà eliminato ogni riferimento a te in tutti gli account Huberway per i quali utilizzi questa e-mail.
                Non potrai più accedere a nessun account Huberway con questo indirizzo e-mail.
                Perderai anche tutte le certificazioni Huberway Academy e i progressi associati a questo indirizzo e-mail.
                Questa azione non può essere annullata.</p>
            </div>
            <p className='fw-bold'>
              Inserisci il tuo indirizzo e-mail qui di seguito per eliminare il tuo utente.
            </p>
            <TextField
              fullWidth
               className='mt-0'
              label="Conferma e-mail"
              type="email"
              margin="normal"
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleCloseDeleteAccount}
              style={{backgroundColor: "#F2545B"}}
            >
              Elimina utente
            </Button>
   
          </Box>
        </Modal>

        <Modal open={openExitSession} onClose={handleCloseExitSession}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" component="h2" gutterBottom style={{color: "#F2545B"}}>
            Uscire da tutte le sessioni?
            </Typography>
            <div className='my-3'>
              <p style={{fontSize: "15px"}}>La disconnessione da tutti i dispositivi e dalle sessioni ti disconnetterà anche dalla sessione attiva corrente.</p>
            </div>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleCloseExitSession}
              style={{backgroundColor: "#F2545B"}}
            >
              Si disconnettimi
            </Button>
   
          </Box>
        </Modal>
    </>
  );
};

export default SettingsSecurity;

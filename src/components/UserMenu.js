import React from "react";
import Avatar from "@mui/material/Avatar";
import MessageIcon from '@mui/icons-material/Message';

function UserMenu({ user, onLogout }) {
  return (
    <div
      className="user-popup-menu"
      style={{
        position: "absolute",
        top: "60px",
        right: "0",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        padding: "20px",
        zIndex: 1000,
        width: "300px",
      }}
    >
      <div className="d-flex gap-2 align-items-center">
        <Avatar sx={{ bgcolor: "orange" }}>OP</Avatar>
        <div className="d-flex flex-column gap-1">
          <p className="mb-0"><strong>{user.name || "Gennaro Ereditata"}</strong></p>
          <p style={{ margin: 0, color: "#64748B" }}>{user.email || "g.ereditata@huberway.com"}</p>
          <p style={{ color: "#0039A9", cursor: "pointer" }} className="mb-0"><b>Profilo e preferenze</b></p>
        </div>
      </div>

      <hr className="my-3" />

      <div className="d-flex gap-2 align-items-center">
        <MessageIcon className="position-relative" style={{fontSize: "15px", top: "3px"}}/>
        <p className="mb-0">Condividi feedback di navigazione</p>
      </div>

      <hr className="my-3" />

      <div className="d-flex flex-column gap-0 align-items-start">
        <p className="mb-0">Account</p>
        <p className="mb-0">Huberway</p>
        <p className="mb-0">ID: {user.id || "N/A"}</p>
      </div>

      <hr className="my-3" />

      <ul style={{ listStyle: "none", padding: 0, margin: "10px 0" }}>
        <li style={{ color: "#f59e0b" }}>Termina la configurazione del tuo account (30%)</li>
        <li>Invita il team</li>
        <li>Account e fatturazione</li>
        <li>HubSpot Academy</li>
        <li>Prezzi e funzionalità</li>
        <li>Aggiornamenti sui prodotti</li>
        <li>Formazione e servizi</li>
      </ul>

      <hr className="my-3" />


      <ul style={{ listStyle: "none", padding: 0 }}>
        <li onClick={onLogout} style={{ cursor: "pointer", color: "#ef4444" }}>Esci</li>
        <li>Privacy policy</li>
      </ul>
    </div>
  );
}

export default UserMenu;

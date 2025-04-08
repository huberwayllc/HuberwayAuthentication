import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAccountDetails } from "../backend/api";
import Avatar from '@mui/material/Avatar';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  const [user, setUser] = useState({ email: "", name: "", id: null });
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    getAccountDetails()
      .then((data) => {
        setUser({
          email: data.data.email,
          name: data.data.username,
          id: data.data.id,
        });
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dettagli dell'account:", error);
        navigate("/account/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    const clearCookies = () => {
      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; Path=/; Domain=.huberway.com; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
      });
    };
    clearCookies();
    navigate("/account/login");
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <>
      <header className="header">
        <img
          src="https://cdn.huberway.com/site/logo-dark.svg"
          style={{ cursor: "pointer" }}
          alt="Huberway Logo"
          className="logo"
          onClick={() => navigate("/account/dashboard")}
        />
        <div className="navigation-menu">
          <div style={{ position: "relative", width: "500px" }}>
            <SearchIcon
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94A3B8",
              }}
            />
            <input
              className="border border-0 rounded-4"
              style={{
                backgroundColor: "#F1F5F9",
                padding: "10px 50px 10px 40px",
                width: "100%",
              }}
              placeholder="Search in Huberway..."
            />
            <AutoAwesomeIcon
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#00A3DD",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        <div className="user-menu d-flex align-items-center" ref={menuRef} style={{ position: "relative" }}>
          <ul className="nav-list">
            <li>
              <Link to="/account/pricing">Pricing</Link>
            </li>
          </ul>
          <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
            <Avatar sx={{ bgcolor: "orange" }}>OP</Avatar>
          </div>

          {menuVisible && (
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
                <div>
                  <Avatar sx={{ bgcolor: "orange" }}>OP</Avatar>
                </div>
                <div className="d-flex flex-column gap-1">
                  <p className="mb-0"><strong>{user.name || "Gennaro Ereditata"}</strong> </p>
                  <p style={{ margin: 0, color: "#64748B" }}>{user.email || "g.ereditata@huberway.com"}</p>
                  <p style={{color: "#0039A9", cursor: "pointer"}} className="mb-0"><b>Profilo e preferenze</b> </p>
                </div>
              </div>
              <hr className="my-3" />
              <ul style={{ listStyle: "none", padding: 0, margin: "10px 0" }}>
                <li>Condividi feedback di navigazione</li>
                <li>Account</li>
                <li>Huberway</li>
                <li>ID: 145998190</li>
                <li style={{ color: "#f59e0b" }}>
                  Termina la configurazione del tuo account (30%)
                </li>
                <li>Invita il team</li>
                <li>Account e fatturazione</li>
                <li>HubSpot Academy</li>
                <li>Prezzi e funzionalità</li>
                <li>Aggiornamenti sui prodotti</li>
                <li>Formazione e servizi</li>
              </ul>
              <hr />
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li onClick={handleLogout} style={{ cursor: "pointer", color: "#ef4444" }}>
                  Esci
                </li>
                <li>Privacy policy</li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAccountDetails } from "../backend/api";

function Header() {
  const [user, setUser] = useState({ email: "", name: "", id: null });
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
    // Cancella tutti i cookie sul dominio .huberway.com
    const clearCookies = () => {
      const cookies = document.cookie.split(";");

      cookies.forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; Path=/; Domain=.huberway.com; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
      });
    };

    // Esegui la cancellazione dei cookie
    clearCookies();

    navigate("/account/login");
  };

  return (
    <>
      <header className="header">
        <img
          src="https://cdn.huberway.com/site/logo-dark.svg"
          alt="Huberway Logo"
          className="logo"
        />
        <div className="navigation-menu">
          <ul className="nav-list">
            <li>
              <Link to="/account/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/account/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/account/became-a-partner">Become a partner</Link>
            </li>
          </ul>
        </div>
        <div className="user-menu" ref={menuRef}>
          <div className="user-info">Hello, {user.name}</div>
          <button
            className="btn btn-primary-outline exit-button"
            onClick={handleLogout}
          >
            <i className="fal fa-sign-out"></i>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;

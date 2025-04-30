import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { name: "Le mie app", path: "/settings/account-managament/integration/connected-apps" },
  { name: "Configurazione notifica", path: "/settings/account-managament/integration/connected-apps/alerts" },
];

const ConnectedAppsMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center flex-wrap"
      style={{ borderBottom: "1px solid #ccc" }}
    >
      {menuItems.map((item) => {
        const isSelected = location.pathname === item.path;

        return (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={{
              cursor: "pointer",
              padding: "15px 20px",
              borderBottom: isSelected ? "3px solid #1976d2" : "3px solid transparent",
              fontWeight: isSelected ? "bold" : "normal",
            }}
          >
            <p style={{ fontSize: "15px", margin: 0 }}>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectedAppsMenu;

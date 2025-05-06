// components/settings/SettingsMenu.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { name: "Codice di tracciamento", path: "/settings/account-managament/tracking" },
  { name: "Tracciamento avanzato", path: "/settings/account-managament/advanced-tracking" },
];

const TrackingMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center flex-wrap gap-0">
      {menuItems.map((item) => {
        const isSelected = location.pathname.includes(item.path);

        return (
          <div
            key={item.name}
            onClick={() => navigate(`${item.path}`)}
            style={{
              cursor: "pointer",
              padding: "15px 22px",
              border: "1px solid #ccc",
              backgroundColor: isSelected ? "#fff" : "transparent",
              fontWeight: isSelected ? "bold" : "normal",
            }}
          >
            <p style={{fontSize: "14px"}} className="mb-0">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TrackingMenu;

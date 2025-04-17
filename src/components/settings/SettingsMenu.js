// components/settings/SettingsMenu.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { name: "Profilo", path: "settings/user-preferences/profile" },
  { name: "E-mail", path: "settings/user-preferences/email" },
  { name: "Chiamate", path: "user-preferences/calls" },
  { name: "Calendario", path: "user-preferences/calendar" },
  { name: "Task", path: "user-preferences/tasks" },
  { name: "Sicurezza", path: "settings/user-preferences/security" },
  { name: "Automazione", path: "user-preferences/automation" },
];

const SettingsMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center flex-wrap gap-0">
      {menuItems.map((item) => {
        const isSelected = location.pathname.includes(item.path);

        return (
          <div
            key={item.name}
            onClick={() => navigate(`/${item.path}`)}
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

export default SettingsMenu;

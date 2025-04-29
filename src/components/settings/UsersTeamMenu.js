// components/settings/SettingsMenu.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { name: "Utenti", path: "/settings/account-managament/users-team/users" },
  { name: "Team", path: "/settings/account-managament/users-team/team" },
];

const UsersTeamMenu = () => {
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

export default UsersTeamMenu;

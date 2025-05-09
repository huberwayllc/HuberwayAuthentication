import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { name: "Utenti", path: "/settings/account-managament/users-team/users" },
  { name: "Ruoli", path: "/settings/account-managament/users-team/roles" },
  { name: "Team", path: "/settings/account-managament/users-team/team" },
];

const UsersTeamMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center flex-wrap gap-0">
      {menuItems.map((item, index) => {
        const isSelected = location.pathname.includes(item.path);

        return (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={{
              cursor: "pointer",
              padding: "10px 22px",
              border: "1px solid #ccc",
              borderColor: isSelected ? "#0d6efd" : "#ccc",
              backgroundColor: isSelected ? "#0d6efd" : "transparent",
              color: isSelected ? "white" : "black",
              fontWeight: isSelected ? "bold" : "normal",
              borderTopLeftRadius: index === 0 ? "10px" : "0",
              borderBottomLeftRadius: index === 0 ? "10px" : "0",
              borderTopRightRadius: index === menuItems.length - 1 ? "10px" : "0",
              borderBottomRightRadius: index === menuItems.length - 1 ? "10px" : "0",
            }}
          >
            <p style={{ fontSize: "14px" }} className="mb-0">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UsersTeamMenu;

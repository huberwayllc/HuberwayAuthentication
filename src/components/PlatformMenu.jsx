import React from "react";
import { huberwayLinks } from "../data/platforms";

const PlatformMenu = () => {
  return (
    <div
      className="platform-menu"
      style={{
        position: "absolute",
        top: "60px",
        left: "0",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        padding: "20px",
        zIndex: 1000,
        width: "320px",
      }}
    >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {huberwayLinks.map((app) => (
          <li key={app.name} style={{ marginBottom: "10px" }}>
            <a
              href={app.url}
              onClick={(e) => app.url === "#" && e.preventDefault()}
              style={{
                textDecoration: "none",
                color: "#0039A9",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {app.icons && (
                <img src={app.icons[0]} alt="" style={{ height: "20px" }} />
              )}
              {app.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformMenu;

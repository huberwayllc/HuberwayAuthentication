// components/AppsMenu.jsx
import React, { useRef, useEffect, useState } from "react";


const ElementListMenu = ({ open, setOpen, elements, setSelectElement }) => {
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setOpen]);

    if (!open) return null;

    return (
        <div ref={menuRef} className="apps-dropdown">
            {elements.map((app) => (
                <a
                    key={app.name}
                    href={app.url}
                    onClick={() => setSelectElement(app)}
                    className={`app-link ${app.url === "#" ? "coming-soon" : ""}`}
                >
                    {app.icon && <img src={app.icon} alt={app.name} style={{ width: 20, marginRight: 8 }} />}
                    <div>
                        <strong>{app.name}</strong>
                        <div style={{ fontSize: "12px", color: "#666" }}>{app.description}</div>
                    </div>
                    {app.url === "#" && <span className="coming-soon-label">Coming Soon</span>}
                </a>
            ))}
        </div>
    );
};

export default ElementListMenu;

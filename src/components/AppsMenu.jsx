// components/AppsMenu.jsx
import React, { useRef, useEffect, useState } from "react";

const huberwayLinks = [
    {
        name: "HubConnect",
        description: "Sales and marketing",
        url: "https://app.huberway.com",
        icon: "https://dev.huberway.com/icon/sales.svg",
    },
   /* {
        name: "MailMaster",
        description: "Email Marketing & Automation",
        url: "https://campaign.huberway.com",
        icon: "https://dev.huberway.com/icon/marketing.svg",
    },
   /* {
        name: "SmartChat AI",
        description: "AI-powered chatbots",
        url: "#",
        icon: "https://dev.huberway.com/icon/smartchat.svg",
    },
    {
        name: "ContentFlow",
        description: "CMS & E-Commerce",
        url: "#",
        icon: "https://dev.huberway.com/icon/content.svg",
    },*/
    {
        name: "Web Analytics",
        description: "Traffic & conversions",
        url: "https://analytics.huberway.com",
        icon: null,
    },
];

const AppsMenu = ({ open, setOpen }) => {
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
            {huberwayLinks.map((app) => (
                <a
                    key={app.name}
                    href={app.url}
                    onClick={(e) => app.url === "#" && e.preventDefault()}
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

export default AppsMenu;

// components/AppsMenu.jsx
import React, { useRef, useEffect, useState } from "react";
import {getAuthData} from "../backend/AuthData";

const huberwayLinks = [
    {
        name: "HubConnect",
        description: "Sales and marketing",
        url: "https://app.huberway.com",
        icon: "https://dev.huberway.com/icon/sales.svg",
    },
    {
        name: "SmartChat",
        description: "AI-powered chatbots",
        url: "/account/smartchat",
        icon: "https://dev.huberway.com/icon/smartchat.svg",
    },
    /*
    {
        name: "Website's",
        description: "Connect your website on Huberway",
        url: "/account/websites",
    },
   {
        name: "CommerceHub",
        description: "Email Marketing & Automation",
        url: "https://commerce.huberway.com",
        icon: "https://dev.huberway.com/icon/content.svg",
    },*/
    /*
    {
        name: "ContentFlow",
        description: "CMS & E-Commerce",
        url: "#",
        icon: "https://dev.huberway.com/icon/content.svg",
    },
    {
        name: "Web Analytics",
        description: "Traffic & conversions",
        url: "https://analytics.huberway.com",
        icon: null,
    },*/
];

const AppsMenu = ({ open, setOpen }) => {
    const menuRef = useRef();

    const [activeModules, setActiveModules] = useState({});

    const { auth_token } = getAuthData();

    const checkModuleStatus = async (moduleName) => {
        try {
            const res = await fetch("https://api.huberway.com/api/module/is-active", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ auth_token, module: moduleName }),
            });
            const data = await res.json();
            return data.is_active === true;
        } catch (err) {
            console.error(`Errore nel controllo per il modulo ${moduleName}:`, err);
            return false;
        }
    };

    useEffect(() => {
        const fetchModulesStatus = async () => {
            const statuses = {};
            for (const app of huberwayLinks) {
                if (app.name && app.url !== "#") {
                    const status = await checkModuleStatus(app.name.includes("SmartChat") ? "SmartChat" : app.name);
                    statuses[app.name] = status;
                }
            }
            setActiveModules(statuses);
        };
        fetchModulesStatus();
    }, []);



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
            {huberwayLinks.map((app) => {
                const isActive = activeModules[app.name];
                const shouldBlock = app.url !== "#" && isActive === false;

                return (
                    <a
                        key={app.name}
                        href={shouldBlock ? "https://app.huberway.com/account/pricing" : app.url}
                        onClick={(e) => {
                            if (app.url === "#" || shouldBlock) {
                                e.preventDefault();
                                if (shouldBlock) window.location.href = "https://app.huberway.com/account/pricing";
                            }
                        }}
                        className={`app-link ${app.url === "#" ? "coming-soon" : ""}`}
                    >
                        {app.icon && <img src={app.icon} alt={app.name} style={{ width: 20, marginRight: 8 }} />}
                        <div>
                            <strong>{app.name}</strong>
                            <div style={{ fontSize: "12px", color: "#666" }}>{app.description}</div>
                        </div>
                        {app.url === "#" && <span className="coming-soon-label">Coming Soon</span>}
                        {shouldBlock && <span className="coming-soon-label" style={{ background: "#f87171" }}>Upgrade</span>}
                    </a>
                );
            })}

        </div>
    );
};

export default AppsMenu;

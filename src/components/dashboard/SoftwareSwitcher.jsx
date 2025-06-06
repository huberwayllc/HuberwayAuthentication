// components/dashboard/SoftwareSwitcher.jsx
import React from "react";

const SoftwareSwitcher = ({ selected, onChange }) => {
    const options = [
        { id: "all", label: "Tutti" },
        { id: "crm", label: "HubConnect" },
        { id: "marketing", label: "MailMaster" },
        { id: "supporto", label: "SmartChat" },
    ];

    return (
        <div className="software-switcher">
            {options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => onChange(opt.id)}
                    className={selected === opt.id ? "active" : ""}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
};

export default SoftwareSwitcher;

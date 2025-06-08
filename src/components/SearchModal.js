import React, { useEffect, useRef, useState } from "react";
import {
    CalendarIcon,
    BuildingOffice2Icon,
    UserIcon,
    BriefcaseIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    CubeIcon,
    MagnifyingGlassIcon,
    ClipboardIcon
} from "@heroicons/react/24/outline";
import "../styles/SearchModal.css";

const sections = [
    { name: "Attività", icon: CalendarIcon },
    { name: "Aziende", icon: BuildingOffice2Icon },
    { name: "Contatti", icon: UserIcon },
    { name: "Offerte", icon: BriefcaseIcon },
    { name: "Documenti", icon: DocumentTextIcon },
    { name: "Email", icon: EnvelopeIcon },
    { name: "Prodotti", icon: CubeIcon },
];

const SearchModal = ({ onClose, query, setQuery }) => {
    const [recent, setRecent] = useState(() => {
        const stored = localStorage.getItem("hw-recent-searches");
        return stored ? JSON.parse(stored) : [];
    });

    const [results, setResults] = useState({
        Aziende: [{ id: 1, title: "FIAMMA & P. S.A.S. DI CARLO FIAMMA", created_at: "2025-05-30 11:21" }],
        Contatti: [{ id: 2, title: "Carlo Fiamma" }]
    });

    const ref = useRef(null);

    useEffect(() => {
        const handleOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [onClose]);


    useEffect(() => {
        if (query && query.trim()) {
            const clean = query.trim();
            setRecent(prev => {
                if (prev.includes(clean)) return prev;
                const updated = [clean, ...prev.filter(i => i !== clean)].slice(0, 10);
                localStorage.setItem("hw-recent-searches", JSON.stringify(updated));
                return updated;
            });
        }
    }, [query]);


    const removeRecent = (item) => {
        const updated = recent.filter(i => i !== item);
        setRecent(updated);
        localStorage.setItem("hw-recent-searches", JSON.stringify(updated));
    };

    return (
        <div className="search-overlay">
            <div className="search-container" ref={ref}>
                <aside className="search-sidebar">
                    <button className="resource-btn active">
                        <MagnifyingGlassIcon className="icon" />
                        Tutte le risorse
                    </button>
                    {sections.map((section) => (
                        <button key={section.name} className="resource-btn">
                            <section.icon className="icon" />
                            {section.name}
                        </button>
                    ))}

                    {recent.length > 0 && (
                        <div className="recent-searches">
                            <h4>Cronologia delle ricerche</h4>
                            <ul>
                                {recent.map(item => (
                                    <li key={item}>
                                        {item} <button className="cancel-button" onClick={() => removeRecent(item)}>×</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>

                <main className="search-results">

                    {query.trim() === "" ? (
                        <div className="no-results">
                            <MagnifyingGlassIcon className="icon large" />
                            <p>Scrivi per cercare tra tutte le sezioni</p>
                        </div>
                    ) : Object.keys(results).length === 0 ? (
                        <div className="no-results">
                            <MagnifyingGlassIcon className="icon large" />
                            <p>Nessun risultato che corrisponda ai criteri</p>
                        </div>
                    ) : (
                        <div className="results-container">
                            {Object.entries(results).map(([section, items]) => (
                                <div key={section} className="result-section">
                                    <h5>{section} ({items.length})</h5>
                                    {items.map(el => (
                                        <div className="result-item" key={el.id}>
                                            <div className="info">
                                                <p className="title">{el.title}</p>
                                                {el.created_at && <p className="date">Creato il {el.created_at}</p>}
                                            </div>
                                            <ClipboardIcon className="copy-icon" />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default SearchModal;

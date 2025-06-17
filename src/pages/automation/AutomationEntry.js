import React, { useState, useEffect } from "react";
import {
    PlusIcon,
    ChevronDownIcon,
    PencilIcon,
    CheckIcon
} from "@heroicons/react/24/solid";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import AutomationCreateModal from "./AutomationCreateModal";
import AutomationSingle from "./AutomationSingle";
import {getAuthData} from "../../backend/AuthData";
import "./Automation.css";

const AutomationEntry = () => {
    const [automations, setAutomations] = useState([]);
    const [selectedAutomation, setSelectedAutomation] = useState(null);
    const [showList, setShowList] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");

    const { auth_token } = getAuthData();
/*
    const fetchAutomations = async () => {
        try {
            const res = await fetch(`https://api.huberway.com/api/automation/list/${auth_token}`);
            const data = await res.json();
            setAutomations(data);
        } catch (err) {
            console.error("Errore nel recupero delle automazioni:", err);
        }
    };*/

    const fetchAutomations = async () => {
        // Simulazione delay per effetto realistico
        await new Promise(resolve => setTimeout(resolve, 300));

        // Mock temporaneo
        const mockData = [
            {
                id: 1,
                name: "Lead da Form",
                description: "Crea un nuovo lead quando viene compilato un form sul sito",
            },
            {
                id: 2,
                name: "Reminder Appuntamento",
                description: "Invia una mail 24h prima di un appuntamento con il cliente",
            },
            {
                id: 3,
                name: "Notifica Slack",
                description: "Avvisa il team vendite quando viene chiuso un deal",
            },
        ];

        setAutomations(mockData);
    };


    const updateAutomationName = async (id, newName) => {
        try {
            const res = await fetch(`https://api.huberway.com/api/automation/update-name/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
            });
            if (res.ok) {
                setAutomations(prev =>
                    prev.map(auto => auto.id === id ? { ...auto, name: newName } : auto)
                );
                setEditingId(null);
            }
        } catch (err) {
            console.error("Errore durante l’aggiornamento:", err);
        }
    };

    useEffect(() => {
        fetchAutomations();
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    {selectedAutomation
                        ? `${selectedAutomation.name} - Automation - Huberway`
                        : "Automation List - Huberway"}
                </title>
                <meta name="description" content="Automazioni utente Huberway" />
            </Helmet>

            <Header onActionClick={() => setShowModal(true)} />

            <div className="automation-wrapper p-6">
                <div className="mb-4">
                    <button
                        className="board-dropdown-toggle"
                        onClick={() => setShowList(prev => !prev)}
                    >
                        {showList ? "Nascondi" : "Mostra automazioni"}
                        <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${showList ? "rotate-180" : ""}`} />
                    </button>

                    {showList && automations.length > 0 && (
                        <div className="board-list mt-3">
                            {automations.map((a) => (
                                <div key={a.id} className="board-item">
                                    {editingId === a.id ? (
                                        <div className="board-editing">
                                            <input
                                                className="hw-input"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") updateAutomationName(a.id, editingName);
                                                }}
                                            />
                                            <CheckIcon
                                                className="w-5 h-5 cursor-pointer text-green-600"
                                                onClick={() => updateAutomationName(a.id, editingName)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="board-editing gap-3">
                                            <span onClick={() => setSelectedAutomation(a)} className="cursor-pointer">
                                                {a.name}
                                            </span>
                                            <PencilIcon
                                                className="w-4 h-4 text-gray-500 cursor-pointer"
                                                onClick={() => {
                                                    setEditingId(a.id);
                                                    setEditingName(a.name);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedAutomation && (
                    <AutomationSingle selectedAutomation={selectedAutomation} />
                )}

                {!selectedAutomation && automations.length === 0 && (
                    <div className="supportboard-empty-message">
                        <div className="empty-state-card">
                            <h3 className="empty-title">Nessuna automazione creata</h3>
                            <p className="empty-subtext">Crea la tua prima automazione ora.</p>
                            <button onClick={() => setShowModal(true)} className="hw-button primary mt-4">
                                + Crea Automazione
                            </button>
                        </div>
                    </div>
                )}

                {showModal && (
                    <AutomationCreateModal
                        onClose={() => setShowModal(false)}
                        onCreated={() => {
                            setShowModal(false);
                            fetchAutomations();
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default AutomationEntry;

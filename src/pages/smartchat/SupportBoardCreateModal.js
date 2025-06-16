import React, { useState, useEffect } from "react";
import { getAuthData } from "../../backend/AuthData";
import "./SupportBoardCreateModal.css";

const SupportBoardCreateModal = ({ onClose, onCreated }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleCreateBoard = async () => {
        setLoading(true);
        setError("");

        try {
            const { auth_token, email } = getAuthData(); // <-- Assicurati che user contenga nome e cognome

            const res = await fetch(`https://api.huberway.com/api/smartchat/boards/create/${auth_token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: name,
                    owner_email: email,
                }),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || "Errore durante la creazione della board");

            onCreated(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hw-modal-overlay">
            <div className="hw-slideover">
                <div className="hw-slideover-header">
                    <h2>Create Support Board</h2>
                    <button className="hw-close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="hw-slideover-body">
                    {error && <div className="hw-error-box">{error}</div>}

                    <div className="hw-form-group">
                        <label className="hw-label">Board Name</label>
                        <input
                            type="text"
                            className="hw-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Customer Service Live Chat"
                            disabled={loading}
                        />
                    </div>

                    {loading && (
                        <div className="hw-loading">
                            <div className="hw-spinner" />
                            <span>Creating your board...</span>
                        </div>
                    )}
                </div>

                <div className="hw-footer">
                    <button className="hw-button ghost" onClick={onClose} disabled={loading}>Cancel</button>
                    <button
                        className="hw-button primary"
                        onClick={handleCreateBoard}
                        disabled={loading || name.length < 3}
                    >
                        {loading ? "Creating..." : "Create Board"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupportBoardCreateModal;

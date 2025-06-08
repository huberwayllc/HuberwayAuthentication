import React, { useState, useEffect } from "react";
import { getAuthData } from "../../backend/AuthData";
import "./WebsiteCreateModal.css";

const WebsiteCreateModal = ({ onClose, onCreated }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [dnsInfo, setDnsInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleCreate = async () => {
        setLoading(true);
        setError("");
        try {
            const { auth_token } = getAuthData();
            const res = await fetch("https://api.huberway.com/api/websites/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ auth_token, name, host })
            });

            const json = await res.json();
            if (!json.success) throw new Error(json.message || "Errore creazione sito");

            setDnsInfo(json.data);
            setStep(2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        setLoading(true);
        setError("");
        try {
            const { auth_token } = getAuthData();
            const res = await fetch("https://api.huberway.com/api/websites/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ auth_token, website_id: dnsInfo.website_id })
            });

            const json = await res.json();
            if (!json.success) throw new Error("Verifica fallita");

            onCreated(json.data);
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
                    <h2>{step === 1 ? "Add your website" : "Verify website"}</h2>
                    <button className="hw-close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="hw-slideover-body">
                    {error && <div className="hw-error-box">{error}</div>}

                    {step === 1 && (
                        <>
                            <div className="hw-form-group">
                                <label className="hw-label">Name website</label>
                                <input
                                    type="text"
                                    className="hw-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex. E-Commerce Huberway"
                                />
                            </div>

                            <div className="hw-form-group">
                                <label className="hw-label">Domain</label>
                                <input
                                    type="text"
                                    className="hw-input"
                                    value={host}
                                    onChange={(e) => setHost(e.target.value)}
                                    placeholder="example.com"
                                />
                            </div>

                            <div className="hw-footer">
                                <button className="hw-button ghost" onClick={onClose}>Decline</button>
                                <button
                                    className="hw-button primary"
                                    onClick={handleCreate}
                                    disabled={loading}
                                >
                                    {loading ? "Creation..." : "Next"}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && dnsInfo && (
                        <>
                            <p className="hw-description">Add this record's in your DNS Managament on your Hosting provider platform:</p>
                            <div className="hw-dns-box">
                                <p><strong>Type:</strong> TXT</p>
                                <p><strong>Name:</strong> {dnsInfo.dns_name}</p>
                                <p><strong>Value:</strong> {dnsInfo.dns_value}</p>
                            </div>

                            <div className="hw-footer">
                                <button className="hw-button ghost" onClick={onClose}>Decline</button>
                                <button
                                    className="hw-button success"
                                    onClick={handleVerify}
                                    disabled={loading}
                                >
                                    {loading ? "Waiting..." : "Verify DNS"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebsiteCreateModal;

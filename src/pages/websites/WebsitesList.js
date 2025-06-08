import React, { useEffect, useState } from "react";
import { getAuthData } from "../../backend/AuthData";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import WebsiteCreateModal from "./WebsiteCreateModal"; // nuovo componente da creare
import "../../styles/dashboard.css";

const WebsitesList = () => {
    const [websites, setWebsites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
// Stato aggiuntivo
    const [showModal, setShowModal] = useState(false);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                const { auth_token } = getAuthData();
                const response = await fetch("https://api.huberway.com/api/websites", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ auth_token }),
                });

                const json = await response.json();
                if (!response.ok || !json.success) throw new Error("Errore nel caricamento");

                setWebsites(json.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWebsites();
    }, []);

    const filteredWebsites = websites.filter((site) =>
        site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredWebsites.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleWebsites = filteredWebsites.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <Header onActionClick={() => setShowModal(true)} />
            <div className="crm-list-container">
                <div className="crm-list-header">
                    <h2>Siti Web</h2>
                    <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="text"
                        className="crm-search"
                        placeholder="Cerca per nome..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // reset pagina alla ricerca
                        }}
                    />

                </div>
            </div>

                <div className="crm-table-wrapper">
                    <table className="crm-table">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Dominio</th>
                            <th>Pixel</th>
                            <th>Tracking</th>
                            <th>Stato</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {visibleWebsites.map((site) => (
                            <tr key={site.website_id}>
                                <td>{site.name}</td>
                                <td className="text-muted">{site.host}</td>
                                <td>{site.pixel_key}</td>
                                <td>{site.tracking_type}</td>
                                <td>
                                        <span
                                            className={`pill ${
                                                site.is_enabled === "1" ? "active" : "inactive"
                                            }`}
                                        >
                                            {site.is_enabled === "1" ? "Attivo" : "Disattivo"}
                                        </span>
                                </td>
                                <td className="text-right">
                                    <button
                                        className="dot-button"
                                        onClick={() => navigate(`/account/websites/${site.website_id}`)}
                                        title="Gestisci"
                                    >
                                        ⋯
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!visibleWebsites.length && (
                            <tr>
                                <td colSpan="6" className="text-center text-muted">
                                    Nessun sito trovato.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Paginazione */}
                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <WebsiteCreateModal
                    onClose={() => setShowModal(false)}
                    onCreated={(newSite) => {
                        setWebsites([newSite, ...websites]);
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
};

export default WebsitesList;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthData } from "../../backend/AuthData";
import WebsiteDashboard from "./WebsiteDashboard";
import WebsiteAnalytics from "./WebsiteAnalytics";
import WebsiteCookies from "./WebsiteCookies";
import WebsiteApplication from "./WebsiteApplication";
import WebsiteSettings from "./WebsiteSettings";
import Header from "../../components/Header"
import "./WebsiteDetail.css";

const WebsiteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [website, setWebsite] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("dashboard");

    useEffect(() => {
        const fetchWebsite = async () => {
            try {
                const { auth_token } = getAuthData();
                const res = await fetch("https://api.huberway.com/api/website", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ auth_token, website_id: id }),
                });

                const json = await res.json();
                if (!res.ok || !json.success) throw new Error("Errore caricamento dati");

                setWebsite(json.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWebsite();
    }, [id]);

    if (loading) return <div className="page-container">Caricamento...</div>;
    if (error) return <div className="page-container text-red-500">Errore: {error}</div>;
    if (!website) return null;

    const renderTab = () => {
        switch (activeTab) {
            case "dashboard":
                return <WebsiteDashboard website={website} />;
            case "analytics":
                return <WebsiteAnalytics website={website} />;
            case "cookies":
                return <WebsiteCookies website={website} />;
            case "application":
                return <WebsiteApplication website={website} />;
            case "settings":
                return <WebsiteSettings website={website} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
                <button className="go-back-btn" onClick={() => navigate(-1)}><i className="fal fa-arrow-left"></i> Come back</button>
                <h2 className="page-title">{website.name}</h2>

                {/* Nav Tabs */}
                <div className="tabs-header">
                    {["dashboard", "analytics", "cookies", "application", "settings"].map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

            <div className="page-container">

                {renderTab()}
            </div>
        </>
    );
};

export default WebsiteDetail;

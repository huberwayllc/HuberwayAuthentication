import React from "react";

const WebsiteDashboard = ({ website }) => {
    return (
        <div className="grid-2-col">
            <div className="card">
                <h3>Dominio</h3>
                <p><strong>Dominio:</strong> {website.scheme}{website.host}</p>
                <p><strong>Pixel:</strong> {website.pixel_key}</p>
            </div>
            <div className="card">
                <h3>Stato</h3>
                <p><strong>Status:</strong> {website.status}</p>
                <p><strong>Attivo:</strong> {website.is_enabled === "1" ? "Sì" : "No"}</p>
            </div>
        </div>
    );
};

export default WebsiteDashboard;

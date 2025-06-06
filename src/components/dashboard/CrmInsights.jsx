// components/dashboard/CrmInsights.jsx
import React from "react";

const CrmInsights = ({ selectedApp }) => {
    if (selectedApp !== "all" && selectedApp !== "crm") return null;

    return (
        <section className="crm-insights">
            <h2>HubConnect - CRM</h2>
            <div className="grid-2col">
                <div className="box">Le mie attività</div>
                <div className="box">Chiusura accordi</div>
                <div className="box">Offerte per fase</div>
                <div className="box">Affari vinti/persi</div>
            </div>
        </section>
    );
};

export default CrmInsights;

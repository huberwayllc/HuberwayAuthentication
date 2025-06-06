// components/dashboard/ReportsSection.jsx
import React from "react";

const ReportsSection = ({ selectedApp }) => {
    const isAll = selectedApp === "all" || selectedApp === "marketing";
    return (
        <section className="report-grid">
            <h2>Reports</h2>
            <div className="report-card">
                <h3>Orders</h3>
                <p>0</p>
            </div>
            <div className="report-card">
                <h3>Revenue</h3>
                <p>€0,00</p>
            </div>
            {isAll && (
                <div className="report-card">
                    <h3>Abandoned Carts</h3>
                    <p>Automatic recovery: <strong>Enabled</strong></p>
                </div>
            )}
        </section>
    );
};

export default ReportsSection;

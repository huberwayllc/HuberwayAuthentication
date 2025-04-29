import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const SubscriptionExpired = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/pricing");
    };

    return (
        <div className="expired-container">
            <Header />
            <div className="expired-message">
                <h2>La tua sessione è scaduta. 😞</h2>
                <p>
                    Sembra che la tua richiesta di sottoscrizione sia scaduta. Puoi provare
                    a selezionare di nuovo un piano e completare l'acquisto.
                </p>
                <button onClick={handleGoBack} className="btn-primary">
                    Torna alla selezione piani
                </button>
            </div>
        </div>
    );
};

export default SubscriptionExpired;
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const SubscriptionSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            setStatus("error");
            return;
        }

        fetch(`/api/subscription/confirm?session_id=${sessionId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStatus("success");
                } else if (data.status === "expired") {
                    // redirect to dedicated page for expired session
                    navigate("/subscription/expired");
                } else {
                    setStatus("error");
                }
            })
            .catch(() => setStatus("error"));
    }, [searchParams, navigate]);

    return (
        <>
            <Header />
            <main style={{ padding: '2rem', textAlign: 'center' }}>
                {status === "loading" && <p>Verifica in corso...</p>}
                {status === "success" && <h2>Sottoscrizione confermata! 🎉</h2>}
                {status === "expired" && <h2>La sessione è scaduta. 😞</h2>}
                {status === "error" && <h2>Errore nella conferma della sottoscrizione.</h2>}
            </main>
        </>
    );
};

export default SubscriptionSuccess;

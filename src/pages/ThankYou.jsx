import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get("session_id");

        if (sessionId) {
            fetch(`https://api.huberway.com/api/subscription/confirm?session_id=${sessionId}`)
                .then(res => {
                    if (!res.ok) throw new Error("Errore nella conferma dell'abbonamento");
                    return res.json();
                })
                .then(data => {
                    console.log("Abbonamento confermato:", data);
                })
                .catch(err => {
                    console.error("Errore durante la conferma:", err);
                });
        }
    }, [location.search]);

    return (
        <>
            <Header />
            <div className="thankyou-page d-flex flex-column align-items-center justify-content-center text-center"
                 style={{ minHeight: "calc(100vh - 80px)", padding: "40px" }}>
                <CheckCircleIcon style={{ fontSize: "80px", color: "#00c292" }} />
                <h1 className="mt-4" style={{ fontSize: "32px", fontWeight: "600" }}>
                    Thank you for subscribing!
                </h1>
                <p className="mt-2 mb-4" style={{ fontSize: "18px", color: "#555" }}>
                    Your subscription has been successfully activated.<br />
                    You’re now ready to explore all the features of Huberway.
                </p>

                <div className="d-flex gap-3 flex-wrap justify-content-center">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/dashboard")}
                    >
                        Go to Dashboard
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/pricing")}
                    >
                        View More Modules
                    </button>
                </div>
            </div>
        </>
    );
};

export default ThankYou;

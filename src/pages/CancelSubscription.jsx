import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const CancelSubscription = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const cancelRequest = async () => {
            if (!sessionId) {
                setMessage("Session ID not found.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("https://api.huberway.com/api/subscription/cancel", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ session_id: sessionId })
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage("Your subscription request has been cancelled successfully.");
                } else {
                    setMessage(data?.message || "Failed to cancel the subscription request.");
                }
            } catch (error) {
                console.error("Cancel error:", error);
                setMessage("Server error. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        cancelRequest();
    }, [sessionId]);

    return (
        <>
            <Header />
            <div className="cancel-page d-flex flex-column align-items-center justify-content-center text-center"
                 style={{ minHeight: "calc(100vh - 80px)", padding: "40px" }}>
                <WarningAmberIcon style={{ fontSize: "80px", color: "#e74c3c" }} />
                <h1 className="mt-4" style={{ fontSize: "28px", fontWeight: "600" }}>
                    Cancel Subscription Request
                </h1>

                {loading ? (
                    <p className="mt-3">Cancelling your request...</p>
                ) : (
                    <p className="mt-3" style={{ color: "#333" }}>{message}</p>
                )}
            </div>
        </>
    );
};

export default CancelSubscription;

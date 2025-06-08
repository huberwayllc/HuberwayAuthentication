import React from "react";
import Cookies from 'js-cookie';
import {getAuthData} from "../backend/AuthData";

const PricingCard = ({
                         plan,
                         description,
                         price,
                         user,
                         features,
                         pricingMode,
                         userCount,
                         activePlanPrice // prezzo per user del piano attuale
                     }) => {
    const selectedPrice = price[pricingMode]; // prezzo corrente selezionato (monthly o yearly)
    const hasMonthly = price.monthly && price.monthly.amount;
    const hasYearly = price.yearly && price.yearly.amount;

    const isActivePlan = user?.subscription?.plan_id === selectedPrice?.id;
    const subscriptionConfirmed = user?.subscription?.status === "confirmed";

    const savings =
        hasMonthly && hasYearly
            ? Math.round(((price.monthly.amount * 12 - price.yearly.amount) / (price.monthly.amount * 12)) * 100)
            : null;

    function getPrice() {
        if (!selectedPrice) return "N/A";
        const total = selectedPrice.amount * userCount;
        return (
            <>
                {total.toFixed(2)}€<br />
                <span style={{ fontSize: "14px" }}>
                    {pricingMode === "yearly" ? "Annuale" : "Mensile"} per {userCount} utent{userCount > 1 ? "i" : "e"}
                </span>
            </>
        );
    }

    const handleSubmit = async (priceId) => {
        try {
            const response = await fetch("https://api.huberway.com/api/subscription/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plan_id: priceId,
                    email: user.email,
                    user_count: userCount,
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Impossibile avviare la sottoscrizione. Riprova.");
            }
        } catch (error) {
            console.error("Subscription request error:", error);
            alert("Errore nella richiesta. Contatta il supporto.");
        }
    };

    const handleCancel = async () => {
        if (!window.confirm("Sei sicuro di voler annullare la sottoscrizione?")) return;

        const { auth_token } = getAuthData();
        try {
            const response = await fetch("https://api.huberway.com/api/subscription/unsubscribe", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                    "Content-Type": "application/json",
                }
            });

            const data = await response.json();
            if (data.success) {
                alert("Sottoscrizione annullata con successo.");
                window.location.reload();
            } else {
                alert("Impossibile annullare la sottoscrizione.");
            }
        } catch (error) {
            console.error("Errore annullamento:", error);
            alert("Errore. Contatta il supporto.");
        }
    };

    function getPriceID() {
        return selectedPrice?.id || null;
    }

    const getActionLabel = () => {
        console.log(activePlanPrice);
        const newAmount = selectedPrice?.amount;
        if (isActivePlan) return "Piano Attivo";
        if (!activePlanPrice || newAmount === undefined || isNaN(newAmount)) return "Seleziona Piano";
        if (newAmount > activePlanPrice) return "Upgrade";
        if (newAmount < activePlanPrice) return "Downgrade";
        return "Seleziona Piano";
    };

    return (
        <div className="pricing-card position-relative">
            <h3 style={{ fontSize: "22px" }}>{plan}</h3>
            {description && <p style={{ fontSize: "14px", minHeight: "48px" }}>{description}</p>}

            <div className="price">{getPrice()}</div>

            {pricingMode === "yearly" && savings !== null && savings > 0 && (
                <div style={{ color: "#28a745", fontSize: "14px", marginBottom: "10px" }}>
                    Risparmia {savings}% con fatturazione annuale
                </div>
            )}

            <hr className="hr-dash" />

            <ul className="features">
                {features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                ))}
            </ul>

            {isActivePlan && subscriptionConfirmed ? (
                <div className="text-center mt-3">
                    <p style={{ color: "#22c55e", fontWeight: "bold", marginBottom: "8px" }}>
                        Piano Attivo
                    </p>
                    <button className="btn btn-sm btn-outline-danger" onClick={handleCancel}>
                        Annulla Piano
                    </button>
                </div>
            ) : (
                <button
                    className="select-plan-btn position-absolute"
                    onClick={() => handleSubmit(getPriceID())}
                    disabled={!getPriceID()}
                >
                    {getActionLabel()}
                </button>
            )}
        </div>
    );
};

export default PricingCard;

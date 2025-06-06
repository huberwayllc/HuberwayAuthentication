import React from "react";

const PricingCard = ({ plan, description, price, user, features, pricingMode, userCount }) => {
    const selectedPrice = price[pricingMode]; // "monthly" o "yearly"
    const hasMonthly = price.monthly && price.monthly.amount;
    const hasYearly = price.yearly && price.yearly.amount;

    const savings =
        hasMonthly && hasYearly
            ? Math.round(((price.monthly.amount * 12 - price.yearly.amount) / (price.monthly.amount * 12)) * 100)
            : null;

    function getPrice() {
        if (!selectedPrice) return "N/A";
        const total = selectedPrice.amount * userCount;
        return (
            <>
                {total.toFixed(2)}€<br></br>
                <span style={{ fontSize: "14px", marginLeft: "0px" }}>
                {pricingMode} for {userCount} user{userCount > 1 ? "s" : ""}
            </span>
            </>
        );
    }



    const handleSubmit = async (priceId) => {
        console.log(priceId);
        try {
            const response = await fetch("https://api.huberway.com/api/subscription/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    plan_id: priceId,
                    email: user.email,
                    user_count: userCount
                })
            });

            console.log("response", response);
            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Subscription creation failed. Please try again.");
            }
        } catch (error) {
            console.error("Subscription request error:", error);
            alert("Error occurred. Please contact support.");
        }
    };



    function getPriceID() {
        return selectedPrice?.id || null;
    }

    return (
        <div className="pricing-card position-relative">
            <h3 style={{ fontSize: "22px" }}>{plan}</h3>
            {description && <p style={{ fontSize: "14px", minHeight: "48px" }}>{description}</p>}

            <div className="price">{getPrice()}</div>

            {pricingMode === "yearly" && savings !== null && savings > 0 && (
                <div style={{ color: "#28a745", fontSize: "14px", marginBottom: "10px" }}>
                    Save {savings}% with annual billing
                </div>
            )}

            <hr className="hr-dash" />

            <ul className="features">
                {features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                ))}
            </ul>

            <button
                className="select-plan-btn position-absolute"
                onClick={() => handleSubmit(getPriceID())}
                disabled={!getPriceID()}
            >
                Select Plan
            </button>
        </div>
    );
};

export default PricingCard;

import React, {useState} from "react";

const PricingCard = ({ plan, index,price, features }) => {
    const [pricingMode, setPricingMode] = useState("monthly");
    

    function getPrice(){
        if(pricingMode === "monthly"){
            return price.monthly + "$/month";
        } else {
            return price.yearly + "$/year";
        }
    }

    return (
        <div className="pricing-card" key={index}>
            <h3>{plan}</h3>
            <div className="price">{getPrice()}</div>
            <hr className="hr-dash"/>
            <ul className="features">
                {features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                ))}
            </ul>

            <div className="pricing-toggle">
                <span className={`toggle-label ${pricingMode === "monthly" ? "active" : ""}`}>Monthly</span>
                <button
                    className={`toggle-switch ${pricingMode === "yearly" ? "active" : ""}`}
                    onClick={() => setPricingMode(pricingMode === "monthly" ? "yearly" : "monthly")}
                    aria-label={`Switch to ${pricingMode === "monthly" ? "yearly" : "monthly"} billing`}
                >
                    <span className="toggle-handle"></span>
                </button>
                <span className={`toggle-label ${pricingMode === "yearly" ? "active" : ""}`}>Yearly</span>
            </div>

            <button className="select-plan-btn">
                Select Plan
            </button>
        </div>
    );
}

export default PricingCard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountDetails } from "../backend/api";
import Header from "../components/Header";
import PricingCard from "../components/PricingCard";

const Pricing = () => {
    const [user, setUser] = useState({ email: "", name: "" });
    const [selectedApp, setSelectedApp] = useState(null);
    const [products, setProducts] = useState([]);
    const [userCount, setUserCount] = useState(1);
    const [pricingMode, setPricingMode] = useState("monthly");
    const navigate = useNavigate();

    const handleUserCountChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setUserCount("");
        } else {
            const parsed = parseInt(value);
            if (!isNaN(parsed) && parsed >= 1) {
                setUserCount(parsed);
            }
        }
    };

    useEffect(() => {
        getAccountDetails()
            .then((data) => {
                setUser({
                    email: data.data.email,
                    name: data.data.username,
                    id: data.data.id,
                });
            })
            .catch((error) => {
                console.error("Error fetching account details:", error);
                navigate("/account/login");
            });
    }, [navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://api.huberway.com/api/plans");
                const data = await response.json();

                data.forEach((item) => {
                    item.plans = groupPlans(item.plans);
                });

                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    function groupPlans(plans) {
        const grouped = {};

        plans.forEach(plan => {
            const name = plan.name.trim();
            const period = plan.billing_period.toLowerCase();
            if (!grouped[name]) {
                grouped[name] = {
                    plan_name: name,
                    description: plan.description,
                    software: plan.software_module,
                    target: "ALL",
                    price: {
                        month: null,
                        year: null
                    },
                    id: plan.id
                };
            }

            grouped[name].price[period] = {
                amount: parseFloat(plan.price_per_user),
                currency: "EUR",
                stripe_price_id: null,
                id: plan.id
            };
        });

        return Object.values(grouped);
    }

    const handleSubmit = async (priceId) => {
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

            const data = await response.json();

            if (data.session_url) {
                window.location.href = data.session_url;
            } else {
                alert("Subscription creation failed. Please try again.");
            }
        } catch (error) {
            console.error("Subscription request error:", error);
            alert("Error occurred. Please contact support.");
        }
    };

    return (
        <div className="dashboard-container">
            <Header />
            <div className="topbar">
                <div className="topbar-scroll">
                    {products.map((link, index) => (
                        <div
                            key={index}
                            className={`topbar-item ${selectedApp?.name === link.name ? "active" : ""}`}
                            onClick={() => setSelectedApp(link)}
                        >
                            {link.icon && (
                                <img src={link.icon} alt={link.name} className="topbar-icon" />
                            )}
                            <span>{link.name}</span>
                        </div>
                    ))}

                    <div className="topbar-usercount enhanced-usercount">
                        <label htmlFor="userCount" className="usercount-label">Users:
                            <span className="info-icon" title="Number of users to include in the subscription">
                                <i className="fal fa-info-circle"></i>
                            </span>
                        </label>
                        <div className="usercount-control">
                            <button
                                className="usercount-btn"
                                onClick={() => setUserCount(prev => Math.max(1, prev - 1))}
                                type="button"
                            >−</button>

                            <input
                                id="userCount"
                                className="usercount-input"
                                type="number"
                                value={userCount === "" ? "" : userCount}
                                min="1"
                                onChange={handleUserCountChange}
                                onBlur={() => {
                                    if (!userCount || userCount < 1) setUserCount(1);
                                }}
                            />

                            <button
                                className="usercount-btn"
                                onClick={() => setUserCount(prev => prev + 1)}
                                type="button"
                            >+</button>
                        </div>
                    </div>
                    <div className="pricing-toggle" style={{ marginLeft: "20px" }}>
                        <span className={`toggle-label ${pricingMode === "monthly" ? "active" : ""}`}>Monthly
                        <span className="info-icon" title="Billed every month">
                                <i className="fal fa-info-circle"></i>
                            </span></span>


                        <button
                            className={`toggle-switch ${pricingMode === "yearly" ? "active" : ""}`}
                            onClick={() => setPricingMode(pricingMode === "monthly" ? "yearly" : "monthly")}
                            aria-label={`Switch to ${pricingMode === "monthly" ? "yearly" : "monthly"} billing`}
                        >
                            <span className="toggle-handle"></span>
                        </button>
                        <span className={`toggle-label ${pricingMode === "yearly" ? "active" : ""}`}>Yearly

                            <span className="info-icon" title="Billed once per year with potential savings">
                                <i className="fal fa-info-circle"></i>
                            </span></span>
                    </div>
                </div>
            </div>

            <main className="pricing dynamic">
                <section className="pricing-details">
                    {selectedApp ? (
                        <div>
                            <div className="pricing-container">
                                <div className="app-title">
                                    <div className="app-logo">
                                        <img src={selectedApp.icon} alt="App Icon" />
                                    </div>
                                    <h4 className="app-name">{selectedApp.name}</h4>
                                </div>

                                <h6 className="app-description">{selectedApp.description}</h6>

                                {selectedApp.plans.length > 0 ? (
                                    <div className="pricing-cards">
                                        {selectedApp.plans.map((pricingOption, index) => {
                                            const { month, year } = pricingOption.price;
                                            const activePrice = pricingMode === "yearly" && year ? year : month;
                                            const savings = month && year
                                                ? ((month.amount * 12 - year.amount) / (month.amount * 12)) * 100
                                                : 0;
                                            return (
                                                <PricingCard
                                                    key={index}
                                                    plan={pricingOption.plan_name}
                                                    description={pricingOption.description}
                                                    price={{ ...pricingOption.price }}
                                                    features={["Feature 1", "Feature 2", "Feature 3"]}
                                                    index={index}
                                                    handleSubmit={() => handleSubmit(activePrice?.id)}
                                                    pricingMode={pricingMode}
                                                    userCount={userCount}
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p style={{ marginTop: 20 }}>No available plans for this module yet.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="no-app-selected">
                            <div className="images">
                                <img
                                    className="huberway-logo"
                                    src="https://cdn.huberway.com/site/logo-dark.svg"
                                    alt="Huberway"
                                />
                                <div className="software-logos">
                                    <img alt="Sales" src="https://dev.huberway.com/icon/sales.svg" />
                                    <img alt="Marketing" src="https://dev.huberway.com/icon/marketing.svg" />
                                    <img alt="SmartChat" src="https://dev.huberway.com/icon/smartchat.svg" />
                                    <img alt="CMS" src="https://dev.huberway.com/icon/content.svg" />
                                </div>
                            </div>
                            <h2>Select a software to view available plans</h2>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Pricing;

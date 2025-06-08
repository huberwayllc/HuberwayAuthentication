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
                    email: data.data.user.email,
                    name: data.data.user.username,
                    id: data.data.user.id,
                    company: data.data.company,
                    sub_accounts: data.data.sub_accounts,
                    subscription: data.data.subscription,
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

            const parsedFeatures = JSON.parse(plan.features);
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
                    id: plan.id,
                    features: parsedFeatures
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

    let activePlanPrice = null;
    const activePlanId = user?.subscription?.plan_id;

    if (activePlanId && selectedApp?.plans?.length > 0) {
        for (const pricingOption of selectedApp.plans) {
            const { monthly, yearly } = pricingOption.price;
            if (monthly?.id === activePlanId) {
                activePlanPrice = monthly.amount;
                break;
            } else if (yearly?.id === activePlanId) {
                activePlanPrice = yearly.amount;
                break;
            }
        }
    }

    if (user && !user.company) {
        return (
            <>
                <Header />
                <div className="no-company-warning" style={{
                    textAlign: 'center',
                    marginTop: '80px',
                    padding: '20px',
                    fontSize: '18px',
                    color: '#e53e3e'
                }}>
                    <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', color: '#e53e3e' }}></i>
                    <p style={{ marginTop: '20px' }}>
                        Il tuo account non è abilitato ad attivare piani. <br />
                        Contatta l’amministratore per proseguire.
                    </p>
                </div>
            </>
        );
    }


    return (
        <>

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

            <div className="">
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

                                                return (
                                                    <PricingCard
                                                        key={index}
                                                        plan={pricingOption.plan_name}
                                                        description={pricingOption.description}
                                                        price={{ ...pricingOption.price }}
                                                        features={pricingOption.features}
                                                        index={index}
                                                        user={user}
                                                        pricingMode={pricingMode}
                                                        userCount={userCount}
                                                        activePlanPrice={activePlanPrice}
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
                            <div className="no-app-selected animated-entry">
                                <div className="orbit">
                                    <div className="planet"></div>
                                    <img src="https://cdn.huberway.com/site/logo-icon.svg" alt="Huberway" className="orbit-logo" />
                                    <div className="satellites">
                                        <img alt="Sales" src="https://dev.huberway.com/icon/sales.svg" />
                                        <img alt="Marketing" src="https://dev.huberway.com/icon/marketing.svg" />
                                        <img alt="SmartChat" src="https://dev.huberway.com/icon/smartchat.svg" />
                                        <img alt="CMS" src="https://dev.huberway.com/icon/content.svg" />
                                    </div>
                                </div>

                                <h2 className="impact-text">Let Huberway elevate your business</h2>
                                <p className="impact-subtext">Select one of our intelligent modules to unlock its power.</p>
                                <button
                                    className="btn btn-primary pulse-button"
                                    onClick={() => {
                                        if (products.length > 0) {
                                            setSelectedApp(products[0]); // seleziona il primo prodotto
                                            document
                                                .querySelector(".topbar-item")
                                                ?.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }
                                    }}
                                >
                                    Explore Plans
                                </button>

                            </div>
                        )}
                    </section>
                </main>
            </div>
        </>
    );
};

export default Pricing;

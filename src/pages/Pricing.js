import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAccountDetails} from "../backend/api";
import Header from "../components/Header";
import PricingCard from "../components/PricingCard";

const Pricing = () => {
    const [user, setUser] = useState({email: "", name: ""});
    const [selectedApp, setSelectedApp] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedTab, setSelectedTab] = useState("Individuals");
    const [userCount, setUserCount] = useState(1);
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
                console.error("Errore nel recupero dei dettagli dell'account:", error);
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
                })

                console.log(data);

                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    function groupPlans(plans) {
        const groupedPlans = {};


        plans.forEach(plan => {
            const baseName = plan.plan_name;
            const recurring = plan.recurring.toLowerCase();

            if (!groupedPlans[baseName]) {
                groupedPlans[baseName] = {
                    id: plan.id,
                    product_name: plan.product_name,
                    plan_name: baseName,
                    features: plan.features,
                    target: plan.target,
                    software: plan.software,
                    created_at: plan.created_at,
                    updated_at: plan.updated_at,
                    price: {
                        month: null,
                        year: null
                    }
                };
            }

            groupedPlans[baseName].price[recurring] = {
                stripe_price_id: plan.stripe_price_id,
                amount: plan.amount,
                currency: plan.currency
            };
        });

        return Object.values(groupedPlans);
    }


    const tabs = [
        {
            key: "Individuals",
            label: "Small teams or Individuals",
        },
        {
            key: "Business",
            label: "Enterprises",
        }
    ]


const handleSubmit = async (priceId) => {
    try {
        const response = await fetch("/api/subscription/request", {
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
            alert("Errore nella creazione della sottoscrizione. Riprova.");
        }
    } catch (error) {
        console.error("Errore durante la richiesta di sottoscrizione:", error);
        alert("Errore durante la richiesta. Contatta il supporto.");
    }
};


    return (
        <div className="dashboard-container">
            <Header/>

            <main className="pricing dynamic">
                {/* Sidebar */}
                <aside className="sidebar">
                    <ul>
                        {products.map((link, index) => (
                            <li
                            key={index}
                            className={selectedApp?.name === link.name ? "active" : ""}
                            onClick={() => setSelectedApp(link)}
                            >
                <span className="icon-container">
                  {link.icon &&
                      <img
                          key={link.name}
                          src={link.icon}
                          alt={link.name}
                          className={`icon`}
                      />
                  }
                </span>
                                <span>{link.name}</span>
                            </li>
                        ))}
                <div style={{padding: "15px 20px"}}>
                    <label className="pb-1 fw-bold">Numero utenti:</label>
                    <input
                    className='inp'
                    style={{width: "100%"}}
                    type="number"
                    value={userCount === "" ? "" : userCount}
                    min="1"
                    onChange={handleUserCountChange}
                    onBlur={() => {
                        if (!userCount || userCount < 1) setUserCount(1);
                    }}
                    />
                </div>
                    </ul>
                </aside>

                <section className="pricing-details">
                    {selectedApp ? (
                        <div>
                            <div className={"pricing-container"}>
                                <div className="pricing-tabs">
                                    {tabs.map((tab, index) => (
                                        <div
                                            key={index}
                                            className={`tab-button ${selectedTab === tab.key ? "active" : ""}`}
                                            onClick={() => setSelectedTab(tab.key)}
                                        >
                                            {tab.label}
                                        </div>
                                    ))}
                                </div>

                                <div className={"app-title"}>
                                    <div className={"app-logo"}>
                                        <img src={selectedApp.icon} alt={"App Icon"}/>
                                    </div>
                                    <h4 className={"app-name"}>{selectedApp.name}</h4>
                                </div>

                                <h6 className={"app-description"}>{selectedApp.description}</h6>
                                <div className="pricing-cards">
                                    {selectedApp.plans.filter(option => option.target === "ALL" || selectedTab === option.target).map((pricingOption, index) => (
                                        <PricingCard
                                            plan={pricingOption.plan_name}
                                            price={{
                                                month: pricingOption.price.month && {
                                                ...pricingOption.price.month,
                                                amount: pricingOption.price.month.amount * userCount
                                                },
                                                year: pricingOption.price.year && {
                                                ...pricingOption.price.year,
                                                amount: pricingOption.price.year.amount * userCount
                                                }
                                            }}
                                            features={["Feature 1", "Feature 2", "Feature 3"]}
                                            index={index}
                                            handleSubmit={handleSubmit}
                                            />
                                    ))}
                                </div>
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
                                    <img
                                        alt="Sales"
                                        src="https://dev.huberway.com/icon/sales.svg"
                                    ></img>
                                    <img
                                        alt="Marketing"
                                        src="https://dev.huberway.com/icon/marketing.svg"
                                    ></img>
                                    <img
                                        alt="SmartChat"
                                        src="https://dev.huberway.com/icon/smartchat.svg"
                                    ></img>
                                    <img
                                        alt="CMS"
                                        src="https://dev.huberway.com/icon/content.svg"
                                    ></img>
                                </div>
                            </div>
                            <h2>Select a software for showing the plane</h2>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Pricing;

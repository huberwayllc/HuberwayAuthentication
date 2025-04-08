import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAccountDetails} from "../backend/api";
import Header from "../components/Header";
import PricingCard from "../components/PricingCard";

const Pricing = () => {
    const [user, setUser] = useState({email: "", name: ""});
    const [selectedApp, setSelectedApp] = useState(null);
    const [selectedTab, setSelectedTab] = useState("Individuals");
    const navigate = useNavigate();


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


    const huberwayLinks = [
        {
            name: "HubConnect",
            description: "Centralized management of Sales and marketing",
            component: "HubConnect",
            icons: [
                "https://dev.huberway.com/icon/sales.svg",
            ],
            pricing: [
                {
                    plan: "Basic",
                    price: {
                        monthly: 19,
                        yearly: 200,
                    },
                    target: "Individuals",
                },
                {
                    plan: "Pro",
                    price: {
                        monthly: 49,
                        yearly: 490,
                    },
                    target: "ALL"
                },
                {
                    plan: "Enterprise",
                    price: {
                        monthly: 99,
                        yearly: 990,
                    },
                    target: "Buisness"
                },
            ],
        },
        {
            name: "SmartChat AI",
            description: "Support your customers with AI-powered chatbots",
            component: "SmartChat",
            icons: ["https://dev.huberway.com/icon/smartchat.svg"],
            pricing: [
                {
                    plan: "Basic",
                    price: {
                        monthly: 19,
                        yearly: 200,
                    },
                    target: "Individuals",
                },
                {
                    plan: "Pro",
                    price: {
                        monthly: 49,
                        yearly: 490,
                    },
                    target: "ALL"
                },
                {
                    plan: "Enterprise",
                    price: {
                        monthly: 99,
                        yearly: 990,
                    },
                    target: "Buisness"
                },
            ],
        },
        {
            name: "ContentFlow",
            description: "Content management, E-Commerce and Web App Development",
            component: "#",
            icons: ["https://dev.huberway.com/icon/content.svg"],
            pricing: [
                {
                    plan: "Basic",
                    price: {
                        monthly: 19,
                        yearly: 200,
                    },
                    target: "Individuals",
                },
                {
                    plan: "Pro",
                    price: {
                        monthly: 49,
                        yearly: 490,
                    },
                    target: "ALL"
                },
                {
                    plan: "Enterprise",
                    price: {
                        monthly: 99,
                        yearly: 990,
                    },
                    target: "Buisness"
                },
            ],
        },
    ];

    const tabs = [
        {
            key: "Individuals",
            label: "Small teams or Individuals",
        },
        {
            key: "Buisness",
            label: "Enterprises",
        }
    ]

    return (
        <div className="dashboard-container">
            <Header/>

            <main className="pricing dynamic">
                {/* Sidebar */}
                <aside className="sidebar">
                    <ul>
                        {huberwayLinks.map((link, index) => (
                            <li
                                key={index}
                                className={selectedApp?.name === link.name ? "active" : ""}
                                onClick={() => setSelectedApp(link)}
                            >
                <span className="icon-container">
                  {link.icons &&
                      link.icons.map((icon, i) => (
                          <img
                              key={i}
                              src={icon}
                              alt={link.name}
                              className={`icon ${
                                  link.icons.length > 1 ? "stacked" : ""
                              }`}
                              style={{left: `${i * 12}px`}} // Sposta leggermente le icone per l'effetto affiancato
                          />
                      ))}
                </span>
                                <span>{link.name}</span>
                            </li>
                        ))}
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
                                        {selectedApp.icons.map((icon, i) => (
                                            <img src={icon} alt={"App Icon"}/>
                                        ))
                                        }
                                    </div>
                                    <h4 className={"app-name"}>{selectedApp.name}</h4>
                                </div>

                                <h6 className={"app-description"}>{selectedApp.description}</h6>
                                <div className="pricing-cards">
                                    {selectedApp.pricing.filter(option => option.target === "ALL" || selectedTab === option.target).map((pricingOption, index) => (
                                        <PricingCard plan={pricingOption.plan} price={pricingOption.price} features={["Feature 1","Feature 2","Feature 3"]} index={index} />
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

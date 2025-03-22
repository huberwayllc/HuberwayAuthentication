import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountDetails } from "../backend/api";
import Header from "../components/Header";

const Pricing = () => {
  const [user, setUser] = useState({ email: "", name: "", id: null });
  const [selectedApp, setSelectedApp] = useState(null);
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
        "https://dev.huberway.com/icon/marketing.svg",
      ],
      pricing: [
        { plan: "Basic", price: "$29/mo" },
        { plan: "Pro", price: "$59/mo" },
        { plan: "Enterprise", price: "Custom Pricing" },
      ],
    },
    {
      name: "SmartChat AI",
      description: "Support your customers with AI-powered chatbots",
      component: "SmartChat",
      icons: ["https://dev.huberway.com/icon/smartchat.svg"],
      pricing: [
        { plan: "Starter", price: "$19/mo" },
        { plan: "Business", price: "$49/mo" },
      ],
    },
    {
      name: "ContentFlow",
      description: "Content management, E-Commerce and Web App Development",
      component: "#",
      icons: ["https://dev.huberway.com/icon/content.svg"],
      pricing: [
        { plan: "Standard", price: "$39/mo" },
        { plan: "Advanced", price: "$79/mo" },
      ],
    },
  ];

  return (
    <div className="dashboard-container">
      <Header />

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
                        style={{ left: `${i * 12}px` }} // Sposta leggermente le icone per l'effetto affiancato
                      />
                    ))}
                </span>
                <span>{link.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Sezione di destra: mostra il pricing del software selezionato */}
        <section className="pricing-details">
          {selectedApp ? (
            <div>
              <h2>{selectedApp.name} Pricing</h2>
              <p>{selectedApp.description}</p>
              <ul className="pricing-plans">
                {selectedApp.pricing.map((plan, i) => (
                  <li key={i} className="plan">
                    <strong>{plan.plan}</strong>: {plan.price}
                  </li>
                ))}
              </ul>
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

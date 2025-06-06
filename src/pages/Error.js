import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountDetails } from "../backend/api";
import Header from "../components/Header";

const Error = () => {
  const [user, setUser] = useState({ email: "", name: "", id: null });
  const [selectedApp, setSelectedApp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAccountDetails()
      .then((data) => {
        setUser({
          email: data.data.user.email,
          name: data.data.user.username,
          id: data.data.user.id,
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

        {/* Sezione di destra: mostra il pricing del software selezionato */}
        <section className="pricing-details">
          <div className="no-app-selected">
            <div className="images">
              <img
                className="huberway-logo"
                src="https://cdn.huberway.com/site/logo-dark.svg"
                alt="Huberway"
              />
              <div className="software-logos">
               <h1>404</h1>
              </div>
            </div>
            <h2>This page dosn't exist, try later.</h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Error;

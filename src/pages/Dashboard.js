import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAccountDetails, getClientApps } from "../backend/api";
import Header from "../components/Header";
import ImportWizardModal from "../components/ImportWizardModal";


const Dashboard = () => {
  const [user, setUser] = useState({ email: "", name: "", id: null });
  const [clientApps, setClientApps] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [wizardOpen, setWizardOpen] = useState(false);


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
    if (user.id) {
      getClientApps()
        .then((apps) => {
          setClientApps(apps.filter((app) => app.user_id === user.id));
        })
        .catch((err) => console.error("Errore nel recupero delle app:", err));
    }
  }, [user.id]);


  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const huberwayLinks = [
    {
      name: "HubConnect",
      description: "Centralized management of Sales and marketing",
      url: "https://app.huberway.com",
      icons: [
        "https://dev.huberway.com/icon/sales.svg",
      ],
    },
      {
        name: "MailMaster",
        description: "Centralized management of Email Marketing & Automation",
        url: "https://campaign.huberway.com",
        icons: [
           "https://dev.huberway.com/icon/marketing.svg",
        ],
      },
    {
      name: "SmartChat AI",
      description: "Support your customers with AI-powered chatbots",
      url: "#",
      icons: ["https://dev.huberway.com/icon/smartchat.svg"],
    },
    {
      name: "ContentFlow",
      description: "Content management, E-Commerce and Web App Development",
      url: "#",
      icons: ["https://dev.huberway.com/icon/content.svg"],
    },
    {
      name: "Web Analytics",
      description: "Detailed analysis of traffic and conversions",
      url: "https://analytics.huberway.com",
    },
  ];

  return (
    <div className="dashboard-container">
     <Header></Header>
      <div style={{ textAlign: "right", padding: "1rem", position: "absolute", marginLeft: "auto", right: "20px", top: "10%" }}>
        <button
            onClick={() => setWizardOpen(true)}
            style={{
              backgroundColor: "transparent",
              color: "rgb(110 110 110)",
              border: "2px solid rgb(110 110 110)",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
        >
          <i className="fas fa-download"></i> Import data
        </button>
      </div>
      <ImportWizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
      <main className="software-list dynamic">
        <section>
          <h2>Apps</h2>
          <div class="grid-container">
            {huberwayLinks.map((software) => (
              <a
                key={software.name}
                href={software.url}
                className={`software-card dynamic-card ${
                  software.url === "#" ? "coming-soon" : ""
                }`}
                onClick={(e) => software.url === "#" && e.preventDefault()} // Previene il click se in Coming Soon
              >
                <div className="card-content">
                  <h3>
                    {software.icons &&
                      software.icons.map((icon, index) => (
                        <img
                          key={index}
                          src={icon}
                          alt=""
                          style={{ height: "30px", marginRight: "5px" }}
                        />
                      ))}
                    {software.name}
                  </h3>
                  <p>{software.description}</p>
                </div>
                {software.url === "#" && (
                  <span className="coming-soon-badge">Coming Soon</span>
                )}
                <div className="card-hover-effect"></div>
              </a>
            ))}
          </div>
        </section>
        <section>
          <h2>My Apps</h2>
          <div class="grid-container">
            {clientApps.map((software) => (
              <a
                key={software.name}
                href={software.url}
                className="software-card dynamic-card"
              >
                <div className="card-content">
                  <h3>{software.name}</h3>
                  <p>Access {software.name} tools and services</p>
                </div>
                <div className="card-hover-effect"></div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

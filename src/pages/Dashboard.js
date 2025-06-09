
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BlogSection from "../components/dashboard/BlogSection";
import ReportsSection from "../components/dashboard/ReportsSection";
import CrmInsights from "../components/dashboard/CrmInsights";
import SoftwareSwitcher from "../components/dashboard/SoftwareSwitcher";
import HuberwayTour from "../components/HuberwayTour";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import { Helmet } from "react-helmet";
import '../styles/dashboard.css';

const Dashboard = () => {
  const [selectedApp, setSelectedApp] = useState("all");const [showTour, setShowTour] = useState(false);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const seenTour = localStorage.getItem("huberway_dashboard_tour_done");
    if (!seenTour) {
      setShowTour(true);
    }
  }, []);

  const handleTourFinish = () => {
    localStorage.setItem("huberway_dashboard_tour_done", "true");
    setShowTour(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula caricamento
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <DashboardSkeleton />;


  return (
      <>
        <Helmet>
          <title>Dashboard - Huberway</title>
          <meta name="description" content="Choose the right plan for your business needs." />
          <meta name="keywords" content="Pricing, Huberway, Business Plans" />
          <meta property="og:title" content="Pricing - Huberway" />
          <meta property="og:description" content="Choose the right plan for your business needs." />
          <meta property="og:image" content="https://app.huberway.com/assets/images/pricing-image.png" />
          <meta property="og:url" content="https://app.huberway.com/account/pricing" />
          <link rel="canonical" href="https://app.huberway.com/account/pricing" />
        </Helmet>

        <Header />

        <div className="dashboard-container">
          <main className="main-dashboard">
            {/* <SoftwareSwitcher selected={selectedApp} onChange={setSelectedApp} /> */}

            <div className="grid-section">
              <div className="one-col-layout">
                <div className="highlight-box" data-tour="cose-da-fare">
                  <h3>Things to do</h3>
                  <div className="tip-card">
                    <strong>Follow the best marketing practices to increase sales</strong>
                    <p>Every product needs customers. Find out how.</p>
                    <a href="/account/pricing" className="btn btn-warning">View pricing</a>
                  </div>
                </div>

              </div>
              <div className="two-col-layout">
                <BlogSection />
                <div className="reports-wrapper" data-tour="resoconti">
                  <ReportsSection selectedApp={selectedApp} />
                </div>
              </div>
            </div>
          </main>
          {showTour && <HuberwayTour onFinish={handleTourFinish} />}
        </div>
      </>
  );
};

export default Dashboard;

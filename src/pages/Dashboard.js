import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Header from "../components/Header";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
      <>
        <Header />
        <div className="dashboard-wrapper">
          {/* Header Section */}
          <div className="dashboard-header">
            <h1 className="dashboard-title"></h1>
            <div className="header-actions">
              <select
                  className="time-range-selector"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="24h">Ultime 24 ore</option>
                <option value="7d">Ultimi 7 giorni</option>
                <option value="30d">Ultimi 30 giorni</option>
                <option value="90d">Ultimi 90 giorni</option>
              </select>

            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats-grid">
            <StatCard
                title="Contatti totali"
                value="1,247"
                change="+12.5%"
                trend="up"
                icon={
                  <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                }
                color="blue"
            />
            <StatCard
                title="Email inviate"
                value="3,842"
                change="+8.1%"
                trend="up"
                icon={
                  <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                }
                color="green"
            />
            <StatCard
                title="Tasso apertura"
                value="24.3%"
                change="-2.1%"
                trend="down"
                icon={
                  <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 15l-2 5L9 9l11 4-5 2z"></path>
                  </svg>
                }
                color="purple"
            />
            <StatCard
                title="Conversioni"
                value="142"
                change="+18.7%"
                trend="up"
                icon={
                  <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v8m0 0l-3-3m3 3l3-3"></path>
                  </svg>
                }
                color="orange"
            />
          </div>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Left Column */}
            <div className="left-column">
              {/* Performance Chart */}
              <div className="card">
                <div className="card-header">
                  <h3>Performance campagne</h3>
                  <button className="text-button">Vedi dettagli</button>
                </div>
                <div className="chart-container">
                  <PerformanceChart />
                </div>
              </div>

              {/* Recent Campaigns */}
              <div className="card">
                <div className="card-header">
                  <h3>Campagne recenti</h3>
                  <button className="text-button">Vedi tutte</button>
                </div>
                <div className="campaigns-list">
                  <CampaignItem
                      name="Welcome Series"
                      status="active"
                      sent={1842}
                      opened={447}
                      clicked={89}
                  />
                  <CampaignItem
                      name="Product Launch"
                      status="scheduled"
                      sent={0}
                      scheduled="18/06/2025 14:00"
                  />
                  <CampaignItem
                      name="Newsletter Maggio"
                      status="completed"
                      sent={2103}
                      opened={512}
                      clicked={124}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Quick Actions */}
              <div className="card quick-actions-card">
                <h3>Azioni rapide</h3>
                <div className="quick-actions-grid">
                  <QuickAction
                      icon={
                        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      }
                      label="Nuova email"
                      onClick={() => console.log("New email")}
                  />
                  <QuickAction
                      icon={
                        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                      }
                      label="Aggiungi contatto"
                      onClick={() => console.log("Add contact")}
                  />
                  <QuickAction
                      icon={
                        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                        </svg>
                      }
                      label="Crea campagna"
                      onClick={() => console.log("Create campaign")}
                  />
                  <QuickAction
                      icon={
                        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      }
                      label="Automazione"
                      onClick={() => console.log("Automation")}
                  />
                </div>
              </div>

              {/* Activity Feed */}
              <div className="card">
                <div className="card-header">
                  <h3>Attività recenti</h3>
                </div>
                <div className="activity-feed">
                  <ActivityItem
                      type="contact"
                      message="Nuovo contatto aggiunto"
                      detail="mario.rossi@example.com"
                      time="2 min fa"
                  />
                  <ActivityItem
                      type="email"
                      message="Campagna inviata"
                      detail="Newsletter Giugno - 1,842 destinatari"
                      time="1 ora fa"
                  />
                  <ActivityItem
                      type="automation"
                      message="Automazione completata"
                      detail="Welcome Series - 23 contatti"
                      time="3 ore fa"
                  />
                  <ActivityItem
                      type="goal"
                      message="Obiettivo raggiunto"
                      detail="1000 iscritti newsletter"
                      time="5 ore fa"
                  />
                </div>
              </div>

              {/* Insights */}
              <div className="card insights-card">
                <div className="card-header">
                  <h3>Suggerimenti</h3>
                </div>
                <div className="insights-list">
                  <InsightItem
                      type="tip"
                      message="Il tuo tasso di apertura è superiore alla media del settore"
                      action="Scopri di più"
                  />
                  <InsightItem
                      type="warning"
                      message="3 contatti hanno segnalato le tue email come spam"
                      action="Risolvi ora"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </>
  );
};

// Components
const StatCard = ({ title, value, change, trend, icon, color }) => (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${trend === 'up' ? 'positive' : 'negative'}`}>
        {change} vs periodo precedente
      </div>
    </div>
);

const CampaignItem = ({ name, status, sent, opened, clicked, scheduled }) => (
    <div className="campaign-item">
      <div className="campaign-header">
        <h4>{name}</h4>
        <span className={`status-badge status-${status}`}>
        {status === 'active' ? 'Attiva' : status === 'scheduled' ? 'Programmata' : 'Completata'}
      </span>
      </div>
      {status === 'scheduled' ? (
          <div className="campaign-scheduled">
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Invio programmato: {scheduled}</span>
          </div>
      ) : (
          <div className="campaign-stats">
            <div className="campaign-stat">
              <span className="stat-label">Inviate</span>
              <span className="stat-value">{sent}</span>
            </div>
            {opened !== undefined && (
                <>
                  <div className="campaign-stat">
                    <span className="stat-label">Aperte</span>
                    <span className="stat-value">{opened}</span>
                  </div>
                  <div className="campaign-stat">
                    <span className="stat-label">Click</span>
                    <span className="stat-value">{clicked}</span>
                  </div>
                </>
            )}
          </div>
      )}
    </div>
);

const QuickAction = ({ icon, label, onClick }) => (
    <button className="quick-action" onClick={onClick}>
      <div className="quick-action-icon">{icon}</div>
      <span>{label}</span>
    </button>
);

const ActivityItem = ({ type, message, detail, time }) => (
    <div className="activity-item">
      <div className={`activity-icon activity-${type}`}>
        {type === 'contact' && (
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
        )}
        {type === 'email' && (
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
        )}
        {type === 'automation' && (
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
        )}
        {type === 'goal' && (
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        )}
      </div>
      <div className="activity-content">
        <p className="activity-message">{message}</p>
        <p className="activity-detail">{detail}</p>
      </div>
      <span className="activity-time">{time}</span>
    </div>
);

const InsightItem = ({ type, message, action }) => (
    <div className={`insight-item insight-${type}`}>
      <div className="insight-icon">
        {type === 'tip' && (
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
        )}
        {type === 'warning' && (
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
        )}
      </div>
      <div className="insight-content">
        <p>{message}</p>
        <button className="insight-action">{action}</button>
      </div>
    </div>
);

const PerformanceChart = () => (
    <div className="chart-placeholder">
      <svg viewBox="0 0 400 200" className="performance-chart">
        {/* Simple line chart representation */}
        <path
            d="M 20 150 L 80 120 L 140 100 L 200 110 L 260 80 L 320 60 L 380 40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
        />
        <path
            d="M 20 150 L 80 140 L 140 130 L 200 135 L 260 120 L 320 110 L 380 100"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
        />
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
            <line
                key={i}
                x1="20"
                y1={40 + i * 30}
                x2="380"
                y2={40 + i * 30}
                stroke="#e5e7eb"
                strokeWidth="1"
            />
        ))}
      </svg>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#3b82f6' }}></span>
          <span>Email inviate</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
          <span>Email aperte</span>
        </div>
      </div>
    </div>
);

const DashboardSkeleton = () => (
    <div className="dashboard-wrapper">
      <div className="skeleton-header"></div>
      <div className="stats-grid">
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-stat"></div>
        ))}
      </div>
      <div className="content-grid">
        <div className="left-column">
          <div className="skeleton-card" style={{ height: '300px' }}></div>
          <div className="skeleton-card" style={{ height: '250px' }}></div>
        </div>
        <div className="right-column">
          <div className="skeleton-card" style={{ height: '150px' }}></div>
          <div className="skeleton-card" style={{ height: '300px' }}></div>
        </div>
      </div>
    </div>
);

export default Dashboard;
import React, { useState, useEffect } from "react";
import "./MarketingHub.css";
import {
    SpeakerWaveIcon,
    AdjustmentsVerticalIcon,
    LinkIcon,
    ChartPieIcon,
    ListBulletIcon,
    EnvelopeIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Header2 from "../../components/Header2";

const MarketingHub = () => {
    const [selectedTab, setSelectedTab] = useState("campaigns");
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            name: "Welcome Series",
            type: "automation",
            status: "active",
            sentCount: 3842,
            openRate: 42.3,
            clickRate: 18.7,
            lastActivity: "2 ore fa",
            scheduledDate: null,
            tags: ["welcome", "onboarding"]
        },
        {
            id: 2,
            name: "Newsletter Giugno",
            type: "broadcast",
            status: "scheduled",
            sentCount: 0,
            openRate: 0,
            clickRate: 0,
            lastActivity: null,
            scheduledDate: "20/06/2025 09:00",
            tags: ["newsletter", "monthly"]
        },
        {
            id: 3,
            name: "Promo Estate 2025",
            type: "broadcast",
            status: "draft",
            sentCount: 0,
            openRate: 0,
            clickRate: 0,
            lastActivity: null,
            scheduledDate: null,
            tags: ["promo", "seasonal"]
        }
    ]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesStatus = filterStatus === "all" || campaign.status === filterStatus;
        const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <>
            <Header2 isSidebarOpen={isSidebarOpen}></Header2>
            <div className="marketing-hub-body">

                <div
                    className={`marketing-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
                    onMouseEnter={() => setIsSidebarOpen(true)}
                    onMouseLeave={() => setIsSidebarOpen(false)}
                >
                    {isSidebarOpen ? (
                        <img className="logo-full" src="https://app.huberway.com/Logo-Huberway-white.png" />
                    ) : (
                        <img className="logo-icon" src="https://cdn.huberway.com/site/logo-icon.svg" />
                    )}
                    <div className={`sidebar-nav ${isSidebarOpen ? 'open' : 'closed'}`}>
                        <button className={`tab ${isSidebarOpen ? 'open' : 'closed'} ${selectedTab === 'campaigns' ? 'active' : ''}`} onClick={() => setSelectedTab('campaigns')}>
                            <SpeakerWaveIcon /> {isSidebarOpen && 'Campaigns'}
                        </button>
                        <button className={`tab ${isSidebarOpen ? 'open' : 'closed'} ${selectedTab === 'automations' ? 'active' : ''}`} onClick={() => setSelectedTab('automations')}>
                            <AdjustmentsVerticalIcon /> {isSidebarOpen && 'Automations'}
                        </button>
                        <button className={`tab ${isSidebarOpen ? 'open' : 'closed'} ${selectedTab === 'lists' ? 'active' : ''}`} onClick={() => setSelectedTab('lists')}>
                            <ListBulletIcon /> {isSidebarOpen && 'Lists'}
                        </button>
                        <button className={`tab ${isSidebarOpen ? 'open' : 'closed'} ${selectedTab === 'templates' ? 'active' : ''}`} onClick={() => setSelectedTab('templates')}>
                            <DocumentTextIcon /> {isSidebarOpen && 'Templates'}
                        </button>
                        <button className={`tab ${isSidebarOpen ? 'open' : 'closed'} ${selectedTab === 'sending' ? 'active' : ''}`} onClick={() => setSelectedTab('sending')}>
                            <EnvelopeIcon /> {isSidebarOpen && 'Sending'}
                        </button>
                        <button className={`tab ${isSidebarOpen ? 'open' : 'closed'} ${selectedTab === 'reports' ? 'active' : ''}`} onClick={() => setSelectedTab('reports')}>
                            <ChartPieIcon /> {isSidebarOpen && 'Reports'}
                        </button>
                    </div>
                </div>
                <div className={`email-campaigns-container ${isSidebarOpen ? '' : 'closed'}`}>
                    {/* Main Content */}
                    {selectedTab === 'campaigns' && (
                        <>
                            {/* Campaign Stats Overview */}
                            <div className="stats-overview">
                                <div className="stat-card mini">
                                    <div className="stat-value">{campaigns.length}</div>
                                    <div className="stat-label">Campagne Totali</div>
                                </div>
                                <div className="stat-card mini">
                                    <div className="stat-value">24.3%</div>
                                    <div className="stat-label">Tasso Apertura Medio</div>
                                </div>
                                <div className="stat-card mini">
                                    <div className="stat-value">8.7%</div>
                                    <div className="stat-label">CTR Medio</div>
                                </div>
                                <div className="stat-card mini">
                                    <div className="stat-value">15.2K</div>
                                    <div className="stat-label">Email Inviate (30g)</div>
                                </div>
                            </div>
                            {/* Filters Bar */}
                            <div className="filters-bar">
                                <div className="search-box">
                                    <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Cerca campagne..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="filter-buttons">
                                    <button
                                        className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                                        onClick={() => setFilterStatus('all')}
                                    >
                                        Tutte
                                    </button>
                                    <button
                                        className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                                        onClick={() => setFilterStatus('active')}
                                    >
                                        <span className="status-dot active"></span>
                                        Attive
                                    </button>
                                    <button
                                        className={`filter-btn ${filterStatus === 'scheduled' ? 'active' : ''}`}
                                        onClick={() => setFilterStatus('scheduled')}
                                    >
                                        <span className="status-dot scheduled"></span>
                                        Programmate
                                    </button>
                                    <button
                                        className={`filter-btn ${filterStatus === 'draft' ? 'active' : ''}`}
                                        onClick={() => setFilterStatus('draft')}
                                    >
                                        <span className="status-dot draft"></span>
                                        Bozze
                                    </button>
                                </div>

                                <div className="view-options">
                                    <button className="view-btn active">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </button>
                                    <button className="view-btn">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>


                            {/* Campaigns List */}
                            <div className="campaigns-list">
                                <table className="campaigns-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" className="checkbox" />
                                        </th>
                                        <th>Nome Campagna</th>
                                        <th>Stato</th>
                                        <th>Destinatari</th>
                                        <th>Aperture</th>
                                        <th>Click</th>
                                        <th>Ultima Attività</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredCampaigns.map(campaign => (
                                        <CampaignRow
                                            key={campaign.id}
                                            campaign={campaign}
                                            onSelect={() => setSelectedCampaign(campaign)}
                                        />
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {selectedTab === 'automations' && <AutomationsTab />}
                    {selectedTab === 'templates' && <TemplatesTab />}
                    {selectedTab === 'reports' && <ReportsTab />}

                    {/* Create Campaign Modal */}
                    {showCreateModal && (
                        <CreateCampaignModal onClose={() => setShowCreateModal(false)} />
                    )}
                </div>
            </div>
            {/* Tabs */}
        </>
    );
};

// Campaign Row Component
const CampaignRow = ({ campaign, onSelect }) => {
    const [showActions, setShowActions] = useState(false);

    return (
        <tr className="campaign-row" onClick={onSelect}>
            <td onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" className="checkbox" />
            </td>
            <td>
                <div className="campaign-name">
                    <div className="name-wrapper">
                        {campaign.type === 'automation' && (
                            <svg className="campaign-icon automation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        )}
                        {campaign.type === 'broadcast' && (
                            <svg className="campaign-icon broadcast" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        )}
                        <span>{campaign.name}</span>
                    </div>
                    <div className="campaign-tags">
                        {campaign.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </td>
            <td>
                <div className={`status-badge ${campaign.status}`}>
                    <span className="status-dot"></span>
                    {campaign.status === 'active' && 'Attiva'}
                    {campaign.status === 'scheduled' && 'Programmata'}
                    {campaign.status === 'draft' && 'Bozza'}
                </div>
                {campaign.scheduledDate && (
                    <div className="scheduled-date">{campaign.scheduledDate}</div>
                )}
            </td>
            <td>{campaign.sentCount > 0 ? campaign.sentCount.toLocaleString() : '-'}</td>
            <td>
                {campaign.openRate > 0 ? (
                    <div className="metric">
                        <span className="metric-value">{campaign.openRate}%</span>
                        <div className="metric-bar">
                            <div className="metric-fill" style={{ width: `${campaign.openRate}%` }}></div>
                        </div>
                    </div>
                ) : '-'}
            </td>
            <td>
                {campaign.clickRate > 0 ? (
                    <div className="metric">
                        <span className="metric-value">{campaign.clickRate}%</span>
                        <div className="metric-bar">
                            <div className="metric-fill click" style={{ width: `${campaign.clickRate}%` }}></div>
                        </div>
                    </div>
                ) : '-'}
            </td>
            <td>{campaign.lastActivity || '-'}</td>
            <td>
                <div className="actions-cell">
                    <button
                        className="action-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowActions(!showActions);
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                    {showActions && (
                        <div className="actions-dropdown">
                            <button className="dropdown-item">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Modifica
                            </button>
                            <button className="dropdown-item">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Duplica
                            </button>
                            <button className="dropdown-item">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Statistiche
                            </button>
                            <hr className="dropdown-divider" />
                            <button className="dropdown-item danger">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Elimina
                            </button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

// Create Campaign Modal
const CreateCampaignModal = ({ onClose }) => {
    const [campaignType, setCampaignType] = useState('');
    const [step, setStep] = useState(1);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Crea Nuova Campagna</h2>
                    <button className="close-btn" onClick={onClose}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {step === 1 && (
                    <div className="modal-body">
                        <p className="modal-subtitle">Scegli il tipo di campagna che vuoi creare</p>

                        <div className="campaign-types">
                            <div
                                className={`campaign-type-card ${campaignType === 'regular' ? 'selected' : ''}`}
                                onClick={() => setCampaignType('regular')}
                            >
                                <div className="type-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3>Campagna Standard</h3>
                                <p>Invia una email una tantum alla tua lista</p>
                            </div>

                            <div
                                className={`campaign-type-card ${campaignType === 'automation' ? 'selected' : ''}`}
                                onClick={() => setCampaignType('automation')}
                            >
                                <div className="type-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3>Automazione</h3>
                                <p>Crea una serie di email automatiche</p>
                            </div>

                            <div
                                className={`campaign-type-card ${campaignType === 'ab-test' ? 'selected' : ''}`}
                                onClick={() => setCampaignType('ab-test')}
                            >
                                <div className="type-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3>Test A/B</h3>
                                <p>Testa diverse versioni per ottimizzare</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Annulla
                    </button>
                    <button
                        className="hw-button primary"
                        disabled={!campaignType}
                        onClick={() => setStep(2)}
                    >
                        Continua
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Placeholder components for other tabs
const AutomationsTab = () => (
    <div className="tab-content">
        <div className="empty-state">
            <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3>Nessuna automazione attiva</h3>
            <p>Crea la tua prima automazione per inviare email in modo automatico</p>
            <button className="hw-button primary">Crea Automazione</button>
        </div>
    </div>
);

const TemplatesTab = () => (
    <div className="tab-content">
        <div className="templates-grid">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="template-card">
                    <div className="template-preview"></div>
                    <h4>Template {i}</h4>
                    <p>Ultimo utilizzo: 3 giorni fa</p>
                </div>
            ))}
        </div>
    </div>
);

const ReportsTab = () => (
    <div className="tab-content">
        <div className="reports-overview">
            <h3>Panoramica Performance</h3>
            <div className="chart-placeholder" style={{ height: '300px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}></div>
        </div>
    </div>
);

export default MarketingHub;
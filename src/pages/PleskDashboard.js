import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPleskDomains, purchaseDomain, manageEmail, upgradeWebspace } from '../backend/pleskApi';
import './App.css';

const PleskDashboard = () => {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getPleskDomains()
            .then(data => {
                setDomains(data.domains);
                setLoading(false);
            })
            .catch(error => {
                console.error('Errore nel recupero dei domini:', error);
                navigate('/account/login');
            });
    }, [navigate]);

    const handlePurchaseDomain = () => {
        const domainName = prompt('Inserisci il nome del dominio che desideri acquistare:');
        if (domainName) {
            purchaseDomain(domainName)
                .then(() => alert('Dominio acquistato con successo!'))
                .catch(err => alert('Errore durante l\'acquisto del dominio: ' + err.message));
        }
    };

    const handleUpgradeWebspace = (domainId) => {
        upgradeWebspace(domainId)
            .then(() => alert('Spazio web aggiornato con successo!'))
            .catch(err => alert('Errore durante l\'upgrade dello spazio web: ' + err.message));
    };

    const handleManageEmail = (domainId) => {
        manageEmail(domainId)
            .then(() => alert('Gestione email avviata con successo!'))
            .catch(err => alert('Errore durante la gestione delle email: ' + err.message));
    };

    if (loading) return <p>Caricamento in corso...</p>;

    return (
        <div className="dashboard-container">
            <header className="header">
                <img src="/logo-huberway.png" alt="Huberway Logo" className="logo" />
                <div className="user-info">Gestione Domini Plesk</div>
            </header>
            <main className="software-list dynamic">
                <section>
                    <h2>Domini Acquistati</h2>
                    <div className="grid-container">
                        {domains.map((domain) => (
                            <div key={domain.id} className="software-card dynamic-card">
                                <div className="card-content">
                                    <h3>{domain.name}</h3>
                                    <p>Spazio Web: {domain.webspace} GB</p>
                                </div>
                                <div className="card-actions">
                                    <button onClick={() => handleManageEmail(domain.id)}>Gestisci Email</button>
                                    <button onClick={() => handleUpgradeWebspace(domain.id)}>Aumenta Spazio Web</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h2>Acquista un nuovo dominio</h2>
                    <button onClick={handlePurchaseDomain} className="purchase-button">Acquista Dominio</button>
                </section>
            </main>
        </div>
    );
};

export default PleskDashboard;

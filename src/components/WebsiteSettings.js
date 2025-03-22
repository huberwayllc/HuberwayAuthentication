// src/components/WebsiteSettings.js
import React, { useState } from 'react';
import { getWebsiteDetails } from '../backend/api';

const WebsiteSettings = ({ websiteId }) => {
    const [siteDetails, setSiteDetails] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const openSettings = () => {
        getWebsiteDetails(websiteId)
            .then(data => {
                setSiteDetails(data.data);
                setIsSettingsOpen(true);
            })
            .catch(error => {
                console.error('Errore nel recupero dei dettagli del sito:', error);
            });
    };

    const closeSettings = () => {
        setIsSettingsOpen(false);
    };

    return (
        <div>
            <button onClick={openSettings}>Open Settings</button>
            {isSettingsOpen && siteDetails && (
                <div className="content-site">
                    <div className="content-app" style={{ width: '27%' }}>
                        <div id="site-letter">{siteDetails.name[0]}</div>
                        <div id="site-name">{siteDetails.name}</div>
                        <a id="site-host" href={siteDetails.host}>
                            {siteDetails.host}
                        </a>
                    </div>
                    <button onClick={closeSettings}>Close Settings</button>
                </div>
            )}
        </div>
    );
};

export default WebsiteSettings;

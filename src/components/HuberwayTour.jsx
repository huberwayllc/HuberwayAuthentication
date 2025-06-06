// components/HuberwayTour.jsx
import React from "react";
import Joyride from "react-joyride";

const HuberwayTour = ({ onFinish }) => {
    const steps = [
        {
            target: '[data-tour="cose-da-fare"]',
            content: "Questa sezione ti suggerisce azioni importanti per migliorare l'uso di Huberway.",
        },
        {
            target: '[data-tour="resoconti"]',
            content: "Qui trovi i dati principali come ordini ricevuti, incassi e carrelli abbandonati.",
        },
        {
            target: '[data-tour="blog"]',
            content: "Scopri i nostri articoli per approfondire strategie e funzionalità.",
        },
        {
            target: '[data-tour="apps"]',
            content: "Accedi alle Apps di Huberway e fai crescere il tuo business.",
        },
    ];

    return (
        <Joyride
            steps={steps}
            continuous
            scrollToFirstStep
            showSkipButton
            showProgress
            disableOverlayClose
            styles={{
                options: {
                    zIndex: 10000,
                    primaryColor: "#3b82f6",
                },
            }}
            callback={(data) => {
                const { status } = data;
                if (["finished", "skipped"].includes(status)) {
                    onFinish();
                }
            }}
        />
    );
};

export default HuberwayTour;

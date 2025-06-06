// components/HuberwayAssistant.jsx
import React, { useEffect, useState } from "react";

const steps = [
    { title: "Benvenuto in Huberway!", text: "Gestisci vendite, marketing e assistenza da un'unica piattaforma." },
    { title: "Scopri HubConnect", text: "Visualizza contatti, trattative e attività centralizzate." },
    { title: "Esplora MailMaster", text: "Crea e monitora campagne di email marketing." },
    { title: "Attiva SmartChat", text: "Supporta i tuoi clienti con un assistente AI." },
];

export default function HuberwayAssistant() {
    const [step, setStep] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hasSeen = localStorage.getItem("huberway_onboarding_done");
        if (!hasSeen) setVisible(true);
    }, []);

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            localStorage.setItem("huberway_onboarding_done", "true");
            setVisible(false);
        }
    };

    if (!visible) return null;

    return (
        <div className="assistant-popup">
            <h4>{steps[step].title}</h4>
            <p>{steps[step].text}</p>
            <button onClick={nextStep}>{step === steps.length - 1 ? "Fine" : "Avanti"}</button>
        </div>
    );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/ImportWizardModal.css"; // crea un file stile base

const softwareOptions = [
    { name: "HubConnect", modules: ["CRM", "Marketing"] },
    { name: "SmartChat", modules: [] },
    { name: "ContentFlow", modules: [] },
];

const importSources = {
    "HubConnect|CRM": ["HubSpot", "Pipedrive", "SalesForce"],
    "Project Management": ["Trello", "ClickUp"],
};

const ImportWizardModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [selectedSoftware, setSelectedSoftware] = useState("");
    const [selectedModule, setSelectedModule] = useState("");
    const [selectedSource, setSelectedSource] = useState("");

    if (!isOpen) return null;

    const reset = () => {
        setStep(1);
        setSelectedSoftware("");
        setSelectedModule("");
        setSelectedSource("");
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const sources =
        importSources[`${selectedSoftware}|${selectedModule}`] ||
        importSources[selectedModule] ||
        [];


    const StepBox = ({ children }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            {children}
        </motion.div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="modal-content modern"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="close-button" onClick={handleClose}>
                            &times;
                        </button>

                        <h2>Importa dati</h2>
                        <p className="modal-subtitle">
                            Segui i passaggi per importare i dati da un altro software
                        </p>

                        {step === 1 && (
                            <StepBox>
                                <h3>1. Seleziona il software</h3>
                                <div className="options-grid">
                                    {softwareOptions.map((s) => (
                                        <button
                                            key={s.name}
                                            className="option-button"
                                            onClick={() => {
                                                setSelectedSoftware(s.name);
                                                setStep(2);
                                            }}
                                        >
                                            {s.name}
                                        </button>
                                    ))}
                                </div>
                            </StepBox>
                        )}

                        {step === 2 && (
                            <StepBox>
                                <h3>2. Seleziona il modulo</h3>
                                {softwareOptions
                                    .find((s) => s.name === selectedSoftware)
                                    ?.modules.map((m) => (
                                        <button
                                            key={m}
                                            className="option-button full"
                                            onClick={() => {
                                                setSelectedModule(m);
                                                setStep(3);
                                            }}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                <button className="back-button" onClick={() => setStep(1)}>
                                    ← Torna indietro
                                </button>
                            </StepBox>
                        )}

                        {step === 3 && (
                            <StepBox>
                                <h3>3. Seleziona la fonte</h3>
                                <div className="options-grid">
                                    {sources.map((src) => (
                                        <button
                                            key={src}
                                            className={`option-button ${
                                                selectedSource === src ? "active" : ""
                                            }`}
                                            onClick={() => setSelectedSource(src)}
                                        >
                                            {src}
                                        </button>
                                    ))}
                                </div>
                                <div className="wizard-footer">
                                    <button className="back-button" onClick={() => setStep(2)}>
                                        ← Torna indietro
                                    </button>
                                    {selectedSource && (
                                        <button
                                            className="confirm-button"
                                            onClick={() => {
                                                alert(
                                                    `Importazione da ${selectedSource} per ${selectedModule} in ${selectedSoftware} avviata!`
                                                );
                                                handleClose();
                                            }}
                                        >
                                            Avvia importazione
                                        </button>
                                    )}
                                </div>
                            </StepBox>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImportWizardModal;

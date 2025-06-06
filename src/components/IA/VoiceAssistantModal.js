import React, { useEffect, useRef, useState } from "react";
import MicOffIcon from '@mui/icons-material/MicOff';
import CloseIcon from '@mui/icons-material/Close';

const VoiceAssistantModal = ({ onClose }) => {
    const [isListening, setIsListening] = useState(true);
    const [responding, setResponding] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "system",
            content: "Sei Huberway AI. Oltre al contenuto, valuta se l'utente è stressato, calmo, urgente o rilassato. Rispondi sempre in tono rassicurante ma adatto alla situazione. Se urgente, sii diretto e rapido. Se calmo, più disteso."
        }
    ]);

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const currentAudio = useRef(null);

    // 🔠 Correzione input utente
    const normalizeInput = (text) => {
        return text
            .replace(/\b(uberway|iuberuei|huberwei|ubairuei|ubarwei|abarway|hubberwey|uberwei)\b/gi, "Huberway");
    };

    // 🔊 Pulizia output vocale
    const cleanOutput = (text) => {
        return text.replace(/\b(uberway|iuberuei|huberwei|ubairuei|abarway|hubberwey|uberwei)\b/gi, "Huberway");
    };

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Il tuo browser non supporta il riconoscimento vocale.");
            return;
        }

        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "it-IT";

        recognition.onresult = async (event) => {
            const lastResult = event.results[event.results.length - 1];
            if (lastResult.isFinal) {
                const rawInput = lastResult[0].transcript;
                const userText = normalizeInput(rawInput);
                const newMessages = [...messages, { role: "user", content: userText }];
                setMessages(newMessages);
                recognition.stop();
                setIsListening(false);
                setResponding(true);

                const reply = await sendToChatGPT(newMessages);
                const allMessages = [...newMessages, { role: "assistant", content: reply }];
                setMessages(allMessages);

                const cleanedReply = cleanOutput(reply);
                await speakText(cleanedReply, () => {
                    setResponding(false);
                    setIsListening(true);
                    recognition.start();
                });
            }
        };

        recognition.onerror = (event) => {
            console.error("Errore nel riconoscimento:", event.error);
        };

        recognitionRef.current = recognition;
        recognition.start();

        return () => {
            recognition.stop();
        };
    }, []);

    {/* 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 */}
    const sendToChatGPT = async (chatMessages) => {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: chatMessages,
                    temperature: 0.7
                })
            });
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (err) {
            console.error("Errore con ChatGPT:", err);
            return "C'è stato un errore nel parlare con l'assistente.";
        }
    };

    const speakText = async (text, onEnd) => {
        const useElevenLabs = false;

        if (useElevenLabs) {
            try {
                const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAMPLE_VOICE_ID", {
                    method: "POST",
                    headers: {
                        "xi-api-key": "TUA_ELEVENLABS_API_KEY",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        text,
                        model_id: "eleven_monolingual_v1",
                        voice_settings: { stability: 0.4, similarity_boost: 0.85 }
                    })
                });

                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);
                currentAudio.current = audio;
                audio.onended = onEnd;
                audio.play();
            } catch (err) {
                console.error("Errore ElevenLabs, fallback Web Speech", err);
                speakWithBrowser(text, onEnd);
            }
        } else {
            speakWithBrowser(text, onEnd);
        }
    };

    const speakWithBrowser = (text, onEnd) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "it-IT";
        utterance.rate = 1;

        const voices = synthRef.current.getVoices();
        const preferred = ["Google italiano", "Microsoft Elsa", "Alice", "Lucia"];
        const voice = voices.find(v =>
            v.lang === "it-IT" &&
            (preferred.some(p => v.name.includes(p)) || v.name.toLowerCase().includes("fem"))
        );
        if (voice) utterance.voice = voice;

        utterance.onend = onEnd;
        synthRef.current.speak(utterance);
    };

    const toggleMic = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
        setIsListening(prev => !prev);
    };

    const handleClose = () => {
        synthRef.current.cancel();
        if (currentAudio.current) {
            currentAudio.current.pause();
            currentAudio.current = null;
        }
        if (recognitionRef.current) recognitionRef.current.stop();
        onClose();
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "25vw",
            height: "100vh",
            backgroundColor: "#1e1e1e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 99999,
        }}>
            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.4); }
                    100% { transform: scale(1); }
                }
                .pulse { animation: pulse 1s infinite ease-in-out; }
                .chat-scroll {
                    overflow-y: auto;
                    max-height: 60vh;
                    width: 100%;
                    padding: 0 20px;
                }
                .message { color: white; margin-bottom: 10px; }
                .user { text-align: right; font-weight: bold; }
                .assistant { text-align: left; color: #93c5fd; }
            `}</style>

            <div className={`circle ${(isListening || responding) ? "pulse" : ""}`} style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "white",
                marginTop: "20%",
                marginBottom: "10px"
            }}></div>

            <div className="chat-scroll">
                {messages.filter(m => m.role !== "system").map((m, idx) => (
                    <div key={idx} className={`message ${m.role}`}>
                        {m.content}
                    </div>
                ))}
                {responding && <div className="message assistant">Huberway AI sta pensando...</div>}
            </div>

            <div style={{
                position: "absolute",
                bottom: "40px",
                display: "flex",
                gap: "20px"
            }}>
                <button onClick={toggleMic} style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: isListening ? "#7f1d1d" : "#1f2937",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                }}>
                    <MicOffIcon />
                </button>

                <button onClick={handleClose} style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#1f2937",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                }}>
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

export default VoiceAssistantModal;

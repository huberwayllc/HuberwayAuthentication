import React, { useState } from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CloseIcon from "@mui/icons-material/Close";

const FeedbackModal = ({ onClose, onSubmit }) => {
    const [selected, setSelected] = useState(null);
    const [note, setNote] = useState("");

    const faces = [
        { icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: "48px" }} />, label: "Terrible", value: 1 },
        { icon: <SentimentDissatisfiedIcon style={{ fontSize: "48px" }} />, label: "Bad", value: 2 },
        { icon: <SentimentNeutralIcon style={{ fontSize: "48px" }} />, label: "Okay", value: 3 },
        { icon: <SentimentSatisfiedIcon style={{ fontSize: "48px" }} />, label: "Good", value: 4 },
        { icon: <SentimentVerySatisfiedIcon style={{ fontSize: "48px" }} />, label: "Great", value: 5 }
    ];

    const handleSubmit = () => {
        if (selected) {
            onSubmit({ rating: selected, note });
            onClose();
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#fff",
                borderTop: "1px solid #ddd",
                zIndex: 9999,
                padding: "20px",
                boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
            }}
        >
            <div
                className="d-flex justify-content-between align-items-center mb-3"
                style={{ maxWidth: "1000px", margin: "0 auto" }}
            >
                <h5 className="mb-0">Share your feedback</h5>
                <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
            </div>

            <div
                className="d-flex justify-content-center gap-4 mb-3"
                style={{ maxWidth: "1000px", margin: "0 auto" }}
            >
                {faces.map((face) => (
                    <div
                        key={face.value}
                        style={{
                            cursor: "pointer",
                            color: selected === face.value ? "#0039A9" : "#64748B",
                            transition: "transform 0.2s",
                            transform: selected === face.value ? "scale(1.2)" : "scale(1)",
                        }}
                        onClick={() => setSelected(face.value)}
                        title={face.label}
                    >
                        {face.icon}
                    </div>
                ))}
            </div>

            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <textarea
            className="form-control"
            placeholder="Write your thoughts..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
        ></textarea>

                <div className="text-end mt-3">
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!selected}
                    >
                        Send Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;

// Componente esteso per mostrare guida + preview dei dati di una board selezionata

import React, { useState, useEffect } from "react";
import {
    PlusIcon,
    ChevronDownIcon,
    PencilIcon,
    CheckIcon,
    ChatBubbleLeftRightIcon,
    UserGroupIcon,
    SparklesIcon,
    ArrowTrendingUpIcon
} from "@heroicons/react/24/solid";
import "./SupportBoard.css";
import Header from "../../components/Header";
import SupportBoardCreateModal from "./SupportBoardCreateModal";
import { getAuthData } from "../../backend/AuthData";
import SupportBoardSingle from "./SupportBoardSingle";
import {Helmet} from "react-helmet";

const SupportBoardEntry = () => {
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [showBoards, setShowBoards] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBoardId, setEditingBoardId] = useState(null);
    const [editingName, setEditingName] = useState("");

    const { auth_token } = getAuthData();

    const fetchBoards = async () => {
        try {
            const res = await fetch(`https://api.huberway.com/api/smartchat/boards/${auth_token}`);
            const data = await res.json();
            setBoards(data);
        } catch (err) {
            console.error("Errore nel recupero delle board:", err);
        }
    };

    const updateBoardName = async (id, newName) => {
        try {
            const res = await fetch(`https://api.huberway.com/api/smartchat/boards/update-name/${id}` , {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
            });
            if (res.ok) {
                setBoards(prev =>
                    prev.map(board => board.id === id ? { ...board, name: newName } : board)
                );
                setEditingBoardId(null);
            }
        } catch (err) {
            console.error("Errore durante l’aggiornamento del nome:", err);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    {selectedBoard
                        ? `${selectedBoard.name} - SmartChat - Huberway`
                        : "SmartChat List - Huberway"}
                </title>
                <meta
                    name="description"
                    content={
                        selectedBoard
                            ? `Visualizza la board "${selectedBoard.name}" su SmartChat.`
                            : "Choose the right plan for your business needs."
                    }
                />
                <meta name="keywords" content="SmartChat, Huberway, Support Board" />
                <meta
                    property="og:title"
                    content={
                        selectedBoard
                            ? `${selectedBoard.name} - SmartChat - Huberway`
                            : "SmartChat List - Huberway"
                    }
                />
                <meta
                    property="og:description"
                    content={
                        selectedBoard
                            ? `Gestisci le conversazioni per la board "${selectedBoard.name}".`
                            : "Choose the right plan for your business needs."
                    }
                />
                <meta property="og:image" content="https://app.huberway.com/assets/images/pricing-image.png" />
                <meta property="og:url" content="https://app.huberway.com/smartchat/boards" />
                <link rel="canonical" href="https://app.huberway.com/smartchat/boards" />
            </Helmet>

            <Header setSelectElement={setSelectedBoard} elementList={boards} onActionClick={() => setShowModal(true)} />
            <div className="supportboard-wrapper">
                <div className="mb-6">

                    {/*
                    <button
                        className="board-dropdown-toggle"
                        onClick={() => setShowBoards(prev => !prev)}
                    >
                        {showBoards ? "Hide" : "Show"}
                        <ChevronDownIcon className={`w-4 h-4 ml-2 transition-transform ${showBoards ? "rotate-180" : ""}`} />
                    </button>

                    {showBoards && boards.length > 0 && (
                        <div className="board-list mt-3">
                            {boards.map((board) => (
                                <div key={board.id} className="board-item">
                                    {editingBoardId === board.id ? (
                                        <div className="board-editing">
                                            <input
                                                className="hw-input"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") updateBoardName(board.id, editingName);
                                                }}
                                            />
                                            <CheckIcon
                                                className="w-5 h-5 cursor-pointer text-green-600"
                                                onClick={() => updateBoardName(board.id, editingName)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="board-editing gap-3">
                                            <span onClick={() => setSelectedBoard(board)} className="cursor-pointer">
                                                {board.name}
                                            </span>
                                            <PencilIcon
                                                className="w-4 h-4 text-gray-500 cursor-pointer"
                                                onClick={() => {
                                                    setEditingBoardId(board.id);
                                                    setEditingName(board.name);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    */}
                </div>

                {selectedBoard && (
                    <SupportBoardSingle selectedBoard={selectedBoard}></SupportBoardSingle>
                )}

                {!selectedBoard && boards.length > 0 && (
                    <div className="supportboard-empty-message">
                        <div className="empty-state-card">
                            <div className="empty-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="empty-title">No board selected</h3>
                            <p className="empty-subtext">Please choose one from the list above or create a new SmartChat support board.</p>
                            <button onClick={() => setShowModal(true)} className="hw-button primary mt-4">
                                + Create Board
                            </button>
                        </div>
                    </div>
                )}


                {boards.length === 0 && (
                    <div className="supportboard-empty-message">
                        <div className="empty-state-card">
                            <div className="empty-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="empty-title">No boards created yet</h3>
                            <p className="empty-subtext">Start by creating your first SmartChat support board.</p>
                            <button onClick={() => setShowModal(true)} className="hw-button primary mt-4">
                                + Create Board
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <SupportBoardCreateModal
                    onClose={() => setShowModal(false)}
                    onCreated={() => {
                        setShowModal(false);
                        fetchBoards();
                    }}
                />
            )}
        </>
    );
};

export default SupportBoardEntry;

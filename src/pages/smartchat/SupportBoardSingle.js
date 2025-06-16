import React, { useState } from 'react';
import {
    ChatBubbleLeftRightIcon,
    UserGroupIcon,
    SparklesIcon,
    ArrowTrendingUpIcon
} from "@heroicons/react/24/solid";

const SupportBoardSingle = ({ selectedBoard }) => {
    const [showIframe, setShowIframe] = useState(false);

    const boardId = Number(selectedBoard.id);
    const scriptUrl = `https://smartchat.huberway.com/js/main.js?id=${boardId + 10243098}`;
    const iframeUrl = `https://smartchat.huberway.com/admin.php?id=${boardId + 10243098}`;

    return (
        <>         {!showIframe ? (
            <div className="selected-board-preview">
                <div className="install-snippet">
                    <div className="d-flex flex-grid">
                        <div>
                            <p>Board: {selectedBoard.name}</p>
                            <h3>Installazione</h3>
                            <p>Per installare SmartChat su questa board, integra il seguente snippet nel tuo sito:</p>
                        </div>
                        <button
                            className="hw-button primary margin-custom-button-1"
                            onClick={() => setShowIframe(true)}
                        >
                            Open Dashboard
                        </button>
                    </div>
                    <code>
                        {`<script src="${scriptUrl}"></script>`}
                    </code>
                </div>

                <h4 className="text-lg font-semibold mt-6 mb-3">Panoramica dati</h4>
                <div className="data-cards">
                    <div className="data-card">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Conversazioni</p>
                        <p className="text-lg font-semibold">124</p>
                    </div>
                    <div className="data-card">
                        <UserGroupIcon className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Lead</p>
                        <p className="text-lg font-semibold">58</p>
                    </div>
                    <div className="data-card">
                        <SparklesIcon className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Utenti convertiti</p>
                        <p className="text-lg font-semibold">19</p>
                    </div>
                    <div className="data-card">
                        <ArrowTrendingUpIcon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Messaggi totali</p>
                        <p className="text-lg font-semibold">436</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="iframe-wrapper" style={{ height: '92vh' }}>
                <iframe
                    src={iframeUrl}
                    title="SmartChat Admin"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: '12px',
                    }}
                />
            </div>
        )}
        </>

    );
};

export default SupportBoardSingle;

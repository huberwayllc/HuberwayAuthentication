import React, { useState } from "react";
import "../css/TaskModal.css";

const TaskModal = ({ task = {}, onClose, onSave }) => {
    const [title, setTitle] = useState(task.name || "");
    const [description, setDescription] = useState(task.description || "");
    const [checklist, setChecklist] = useState(task.checklist || []);
    const [newChecklistItem, setNewChecklistItem] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const addChecklistItem = () => {
        if (!newChecklistItem.trim()) return;
        setChecklist([...checklist, { text: newChecklistItem, done: false }]);
        setNewChecklistItem("");
    };

    const toggleChecklistItem = (index) => {
        const updated = [...checklist];
        updated[index].done = !updated[index].done;
        setChecklist(updated);
    };

    const deleteChecklistItem = (index) => {
        const updated = checklist.filter((_, i) => i !== index);
        setChecklist(updated);
    };

    const addComment = () => {
        if (!newComment.trim()) return;
        setComments([{ text: newComment, date: new Date() }, ...comments]);
        setNewComment("");
    };

    return (
        <div className="trello-modal-overlay">
            <div className="trello-modal">
                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-main">
                    <div className="modal-header">
                        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => setTitle(e.target.innerText)}>
                            {title}
                        </h2>
                        <span className="task-list-label">in lista <strong>{task.list || "To Do"}</strong></span>
                    </div>

                    <div className="section">
                        <h4><i className="fas fa-align-left"></i> Descrizione</h4>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Aggiungi una descrizione dettagliata..."
                        ></textarea>
                    </div>

                    <div className="section">
                        <h4><i className="fas fa-check-square"></i> Checklist</h4>
                        <div className="checklist">
                            {checklist.map((item, index) => (
                                <div key={index} className="checklist-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={item.done}
                                            onChange={() => toggleChecklistItem(index)}
                                        />
                                        <span className={item.done ? "completed" : ""}>{item.text}</span>
                                    </label>
                                    <i className="fas fa-trash delete-icon" onClick={() => deleteChecklistItem(index)}></i>
                                </div>
                            ))}
                            <div className="checklist-add">
                                <input
                                    type="text"
                                    value={newChecklistItem}
                                    placeholder="Aggiungi un punto..."
                                    onChange={(e) => setNewChecklistItem(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addChecklistItem()}
                                />
                                <button onClick={addChecklistItem}>
                                    <i className="fas fa-plus"></i> Aggiungi
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <h4><i className="fas fa-comments"></i> Attività</h4>
                        <div className="comments">
                            <input
                                type="text"
                                placeholder="Scrivi un commento..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addComment()}
                            />
                            {comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <div className="comment-header">
                                        <i className="fas fa-user-circle"></i>
                                        <strong>Tu</strong>
                                        <span className="comment-date">{comment.date.toLocaleString()}</span>
                                    </div>
                                    <p>{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-sidebar">
                    <h4>Azioni</h4>
                    <button><i className="fas fa-user"></i> Membri</button>
                    <button><i className="fas fa-tags"></i> Etichette</button>
                    <button><i className="fas fa-check-square"></i> Checklist</button>
                    <button><i className="fas fa-calendar-alt"></i> Data</button>
                    <button><i className="fas fa-paperclip"></i> Allegato</button>
                    <button><i className="fas fa-image"></i> Copertina</button>
                    <hr />
                    <button><i className="fas fa-share-square"></i> Sposta</button>
                    <button><i className="fas fa-copy"></i> Crea modello</button>
                    <button><i className="fas fa-archive"></i> Archivia</button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;

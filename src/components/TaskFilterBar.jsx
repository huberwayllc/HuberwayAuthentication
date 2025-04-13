import React from "react";
import "../css/TaskFilterBar.css";

const TaskFilterBar = ({ filters, onChange, availableTags = [], members = [] }) => {
    return (
        <div className="task-filter-bar">
            <select value={filters.assignedTo} onChange={(e) => onChange({ ...filters, assignedTo: e.target.value })}>
                <option value="">Tutti i membri</option>
                {members.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>

            <select value={filters.tag} onChange={(e) => onChange({ ...filters, tag: e.target.value })}>
                <option value="">Tutti i tag</option>
                {availableTags.map((tag) => (
                    <option key={tag.name} value={tag.name}>{tag.name}</option>
                ))}
            </select>

            <select value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value })}>
                <option value="">Tutti gli stati</option>
                <option value="todo">Da fare</option>
                <option value="in_progress">In corso</option>
                <option value="done">Completato</option>
            </select>
        </div>
    );
};

export default TaskFilterBar;

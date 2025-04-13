import React from "react";

const SidebarProjectManagement = ({
    workspaces = [],
    currentWorkspace,
    onWorkspaceChange,
    myProjects = [],
    sharedProjects = [],
    onSelectProject,
    onCreateProject,
}) => {
    return (
        <aside className="sidebar">
            <div className="workspace-selector">
                <label>Workspace</label>
                <select
                    value={currentWorkspace?.id}
                    onChange={(e) => {
                        const selected = workspaces.find(ws => ws.id === e.target.value);
                        onWorkspaceChange(selected);
                    }}
                >
                    {workspaces.map(ws => (
                        <option key={ws.id} value={ws.id}>{ws.name}</option>
                    ))}
                </select>
            </div>

            <div className="project-section">
                <h4>I miei progetti</h4>
                <ul>
                    {myProjects.map(proj => (
                        <li key={proj.id} onClick={() => onSelectProject(proj)}>
                            {proj.name}
                        </li>
                    ))}
                </ul>

                <h4>Condivisi con me</h4>
                <ul>
                    {sharedProjects.map(proj => (
                        <li key={proj.id} onClick={() => onSelectProject(proj)}>
                            {proj.name}
                        </li>
                    ))}
                </ul>

                <button onClick={onCreateProject}>+ Nuovo progetto</button>
            </div>
        </aside>
    );
};

export default SidebarProjectManagement;

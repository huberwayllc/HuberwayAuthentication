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
        <aside className="sidebar-project">
            <div className="workspace-selector">
                <label htmlFor="workspace">Workspace</label>
                <select
                    id="workspace"
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
                <h5>I miei progetti</h5>
                <ul>
                    {myProjects.map(proj => (
                        <li key={proj.id} onClick={() => onSelectProject(proj)}>
                            <i className="fas fa-folder-open"></i>
                            {proj.name}
                        </li>
                    ))}
                </ul>

                <h5>Condivisi con me</h5>
                <ul>
                    {sharedProjects.map(proj => (
                        <li key={proj.id} onClick={() => onSelectProject(proj)}>
                            <i className="fas fa-users"></i>
                            {proj.name}
                        </li>
                    ))}
                </ul>

                <button className="create-btn" onClick={onCreateProject}>
                    <i className="fas fa-plus"></i> Nuovo progetto
                </button>
            </div>
        </aside>
    );
};

export default SidebarProjectManagement;

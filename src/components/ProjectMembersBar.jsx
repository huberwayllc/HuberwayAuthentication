import React from "react";
import "../css/ProjectMembersBar.css";

const ProjectMembersBar = ({ members = [], onInvite }) => {
    return (
        <div className="project-members-bar">
            <h4>Partecipanti:</h4>
            <div className="members-list">
                {members.map((user) => (
                    <div key={user.id} className="member-avatar" title={user.name}>
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} />
                        ) : (
                            <span>{user.name[0].toUpperCase()}</span>
                        )}
                    </div>
                ))}
                <button className="invite-btn" onClick={onInvite}>+ Invita</button>
            </div>
        </div>
    );
};

export default ProjectMembersBar;

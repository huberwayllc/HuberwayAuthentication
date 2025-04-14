import React, {useEffect, useState} from "react";
import SidebarProjectManagement from "../components/SidebarProjectManagement";
import "../css/project-managament.css";
import Header from "../components/Header";
import ProjectBoard from "../components/ProjectBoard";


const ProjectManagement = () => {
    const [workspaces, setWorkspaces] = useState([]);
    const [currentWorkspace, setCurrentWorkspace] = useState(null);
    const [myProjects, setMyProjects] = useState([]);
    const [sharedProjects, setSharedProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // fetch workspace + projects
        // mock temporaneo
        const mock = [
            {id: "1", name: "Team Dev"},
            {id: "2", name: "Marketing"},
        ];
        setWorkspaces(mock);
        setCurrentWorkspace(mock[0]);

        setMyProjects([
            {id: "proj1", name: "Gestione CRM"},
            {id: "proj2", name: "Nuovo sito"},
        ]);
        setSharedProjects([
            {id: "proj3", name: "Landing ADS"},
        ]);
    }, []);

    const handleSelectProject = (project) => {
        setSelectedProject(project);
    };

    const handleCreateProject = () => {
        console.log("Aggiungi nuova modale creazione progetto");
    };

    return (
        <>
            <Header></Header>
            <div className="dashboard-container-project-management">
                <SidebarProjectManagement
                    workspaces={workspaces}
                    currentWorkspace={currentWorkspace}
                    onWorkspaceChange={setCurrentWorkspace}
                    myProjects={myProjects}
                    sharedProjects={sharedProjects}
                    onSelectProject={handleSelectProject}
                    onCreateProject={handleCreateProject}
                />

                <ProjectBoard selectedProject={selectedProject}/>

            </div>
        </>
    );
};

export default ProjectManagement;

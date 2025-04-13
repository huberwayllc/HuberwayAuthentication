import React, {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import "../css/kanban.css";
import ProjectMembersBar from "./ProjectMembersBar";
import TaskFilterBar from "./TaskFilterBar";
import TaskModal from "./TaskModal";


const ProjectBoard = ({selectedProject}) => {
    const [lists, setLists] = useState([
        {id: "todo", name: "Da fare", tasks: []},
        {id: "in-progress", name: "In corso", tasks: []},
        {id: "done", name: "Completato", tasks: []}
    ]);
    const [filters, setFilters] = useState({
        assignedTo: "",
        tag: "",
        status: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const projectMembers = [
        {id: "1", name: "Gennaro", avatar: ""},
        {id: "2", name: "Maria", avatar: ""},
    ];


    const [newListName, setNewListName] = useState("");

    const addList = () => {
        if (!newListName.trim()) return;
        const newList = {
            id: Date.now().toString(),
            name: newListName,
            tasks: []
        };
        setLists(prev => [...prev, newList]);
        setNewListName("");
    };

    const addTaskToList = (listId, taskName) => {
        if (!taskName.trim()) return;
        setLists(prev =>
            prev.map(list =>
                list.id === listId
                    ? {...list, tasks: [...list.tasks, {name: taskName}]}
                    : list
            )
        );
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(lists);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setLists(items);
    };

    return (
        <main className="project-content">
            {selectedProject ? (
                    <>
                        <ProjectMembersBar members={projectMembers} onInvite={() => alert("Invita membro")}/>

                        <TaskFilterBar
                            filters={filters}
                            onChange={setFilters}
                            availableTags={[{name: "Urgente"}, {name: "Design"}]}
                            members={projectMembers}
                        />

                        <div className="kanban-container">
                            <h2>{selectedProject.name}</h2>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
                                    {(provided) => (
                                        <div
                                            className="kanban-board"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {lists.map((list, index) => (
                                                <Draggable key={list.id} draggableId={list.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            className="kanban-column"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <h3>{list.name}</h3>

                                                            <div className="kanban-tasks">
                                                                {list.tasks.length === 0 ? (
                                                                    <p className="empty">Nessuna task</p>
                                                                ) : (
                                                                    list.tasks.map((task, idx) => (
                                                                        <div className="kanban-task" onClick={() => {
                                                                            setSelectedTask(task);
                                                                            setIsModalOpen(true);
                                                                        }} key={idx}>
                                                                            {task.name}
                                                                        </div>
                                                                    ))
                                                                )}
                                                            </div>

                                                            <input
                                                                type="text"
                                                                className="new-task"
                                                                placeholder="Nuova task"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        addTaskToList(list.id, e.target.value);
                                                                        e.target.value = "";
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}

                                            {/* Lista aggiuntiva */}
                                            <div className="kanban-column add-list">
                                                <input
                                                    type="text"
                                                    placeholder="Nome lista"
                                                    value={newListName}
                                                    onChange={(e) => setNewListName(e.target.value)}
                                                />
                                                <button onClick={addList}>+ Aggiungi lista</button>
                                            </div>

                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                        {isModalOpen && (
                            <TaskModal
                                task={selectedTask}
                                members={projectMembers}
                                onClose={() => setIsModalOpen(false)}
                                onSave={(updatedTask) => {
                                    // TODO: aggiorna la task nello state
                                    console.log("Task salvata:", updatedTask);
                                }}
                            />
                        )}

                    </>

                ) :
                (
                    <div className="empty-project-message">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3898/3898085.png"
                            alt="Select Project"
                            className="empty-icon"
                        />
                        <h3>Nessun progetto selezionato</h3>
                        <p>Seleziona un progetto dalla barra laterale per iniziare a lavorare con le tue liste e
                            attività.</p>
                    </div>
                )
            }
        </main>
    )
        ;
};

export default ProjectBoard;

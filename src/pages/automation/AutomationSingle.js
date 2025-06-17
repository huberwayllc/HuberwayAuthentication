import React, { useCallback, useState } from "react";
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    Controls,
    Background,
    addEdge,
    useNodesState,
    useEdgesState
} from "reactflow";
import "reactflow/dist/style.css";
import Header from "../../components/Header";
import { v4 as uuidv4 } from "uuid";
import "./AutomationFlow.css";

const initialNodes = [
    {
        id: "start",
        type: "input",
        data: { label: "Inizio" },
        position: { x: 250, y: 5 }
    }
];

const initialEdges = [];

const nodeTypes = {
    // Personalizza se servono nodi custom in futuro
};

function AutomationSingle({ selectedAutomation }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        [setEdges]
    );

    const addActionNode = () => {
        const newNode = {
            id: uuidv4(),
            type: "default",
            position: {
                x: Math.random() * 400,
                y: Math.random() * 300
            },
            data: { label: "Azione" }
        };
        setNodes((nds) => [...nds, newNode]);
    };

    const saveFlow = () => {
        if (reactFlowInstance) {
            const flowData = reactFlowInstance.toObject();
            console.log("Flow salvato:", flowData);
            alert("Flusso salvato in console!");
            // In futuro: POST a /api/automation/update-flow
        }
    };

    return (
        <>
            <Header></Header>
            <div className="automation-flow-wrapper">
                <div className="automation-flow-header">
                    <h2 className="text-xl font-semibold">{selectedAutomation.name}</h2>
                    <div className="gap-2 flex">
                        <button onClick={addActionNode} className="hw-button primary">
                            + Aggiungi Azione
                        </button>
                        <button onClick={saveFlow} className="hw-button secondary">
                            💾 Salva
                        </button>
                    </div>
                </div>

                <div className="automation-flow-canvas">
                    <ReactFlowProvider>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            fitView
                            nodeTypes={nodeTypes}
                        >
                            <MiniMap />
                            <Controls />
                            <Background variant="dots" gap={12} size={1} />
                        </ReactFlow>
                    </ReactFlowProvider>
                </div>
            </div>
        </>

    );
}

export default AutomationSingle;

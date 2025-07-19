import { useCallback, useState } from "react";
import "./App.css";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CreateNodes from "./component/CreateNodes.jsx";
import { BaseNodeFullDemo } from "./component/BaseNodeFullDemo.jsx";

const nodeTypes = {
  baseNodeFull: BaseNodeFullDemo,
};

let id = 2;
const getId = () => `${id++}`;

const initialNodes = [
  {
    id: "1",
    type: "baseNodeFull",
    position: { x: 200, y: 200 },
    data: {
      id: "1",
      message: `New Text Message 1`,
    },
  },
];

const initialEdges = [];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
    },
    [reactFlowInstance]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleSaveConfig = () => {
    const connectedNodeIds = new Set();
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    const unconnectedNodes = nodes.filter((node) => !connectedNodeIds.has(node.id));
    if (unconnectedNodes.length > 0) {
      setErrorMessage("Cannot save flow: some nodes are not connected.");
      setTimeout(() => setErrorMessage(null), 3000);
    } else {
      alert("Config saved successfully!");
    }
  };

  return (
    <div className="app-wrapper" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {errorMessage && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            color: "red",
            padding: "10px 20px",
            borderRadius: "10px",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            border: "2px solid red",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "lightgrey",
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}></h2>
        <button
          onClick={handleSaveConfig}
          style={{
            padding: "8px 16px",
            backgroundColor: "#61dafb",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Config
        </button>
      </div>

      {/* Main Layout */}
      <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <div style={{ flexGrow: 1, height: "100%" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 100 }}
            deleteKeyCode={["Delete", "Backspace"]}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
          >
            <Background />
            <Controls />
            <Panel position="top-left" style={{ padding: 10 }}>
              <CreateNodes setNodes={setNodes} getId={getId} />
            </Panel>
          </ReactFlow>
        </div>

        {/* Sidebar */}
        <div
          style={{
            width: 300,
            height: "100%",
            backgroundColor: "#f0f0f0",
            padding: 20,
            boxSizing: "border-box",
            borderLeft: "1px solid #ddd",
          }}
        >
          {selectedNode ? (
            <>
              <h3>Edit Node Message</h3>
              <textarea
                rows={5}
                style={{ width: "100%" }}
                value={selectedNode.data.message}
                onChange={(e) => {
                  const newMessage = e.target.value;
                  setNodes((nds) =>
                    nds.map((node) =>
                      node.id === selectedNode.id
                        ? { ...node, data: { ...node.data, message: newMessage } }
                        : node
                    )
                  );
                  setSelectedNode((node) => ({
                    ...node,
                    data: { ...node.data, message: newMessage },
                  }));
                }}
              />
            </>
          ) : (
            <p>Select a node to edit its message</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

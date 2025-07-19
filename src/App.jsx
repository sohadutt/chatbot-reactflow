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

import CreateNodes from "./component/createNodes.jsx";
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
    data: { id: "1", 
      messe: 'New Text ${id}' 
    },
  },
];

const initialEdges = [];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

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

      const newNodeId = getId();
      const newNode = {
        id: newNodeId,
        type: "baseNodeFull",
        position,
        data: { id: newNodeId, 
          messe: 'New Messege'
        },
        
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance]
  );

  return (
    <div className="app-wrapper" style={{ height: "100vh" }}>
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
      >
        <Background />
        <Controls />
        <Panel position="top-left" style={{ padding: 10 }}>
          <CreateNodes setNodes={setNodes} getId={getId} />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;

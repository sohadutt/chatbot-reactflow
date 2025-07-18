import { useCallback, useState } from 'react';
import './App.css';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CreateNodes from './component/createNodes.jsx';
import CustomEdge from './component/editableEdges.jsx';

const edgeTypes = {
  custom: CustomEdge,
};

const onEdgeLabelChange = (edgeId, newLabel) => {
  setEdges(eds => eds.map(e => e.id === edgeId ? { ...e, label: newLabel } : e));
};


const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start Conversation' },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [];

let id = 2;
const getId = () => `${id++}`;

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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

  return (
    <div className="app-wrapper">
      <ReactFlow
        edgeTypes={edgeTypes}
        edges={edges.map(e => ({ ...e, type: 'custom' }))}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodes={nodes}
        onNodesChange={onNodesChange}
        selectionOnDrag={true}
        multiSelectionKeyCode={null}
        fitView
        deleteKeyCode={['Delete', 'Backspace']}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-left" style={{ padding: 10 }}>
          <CreateNodes setNodes={setNodes} getId={getId} />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;

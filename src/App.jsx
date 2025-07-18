import { useState } from 'react'
import './App.css'
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CreateNodes from './component/createNodes';
const nodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const initialEdges = [
  {
    id: 'node-1-node-2',
    source: 'node-1',
    target: 'n2',
    type: 'step',
    label: 'connects with',
  },
];

const onNodesChange = useCallback(
  (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  [],
);
const onEdgesChange = useCallback(
  (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  [],
);

const onConnect = useCallback(
  (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
  [],
);

function App() {
const [nodes, setNodes] = useState(nodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow>
        <Controls />
        <CreateNodes />
      </ReactFlow>
</div>
);
}

export default App

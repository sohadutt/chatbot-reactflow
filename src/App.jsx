import { useCallback, useState } from 'react';
import './App.css';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  FitViewOptions,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CreateNodes from './component/createNodes.jsx';
import { BaseNodeFullDemo } from './component/BaseNodeFullDemo.jsx';

const nodeTypes = {
  baseNodeFull: BaseNodeFullDemo,
};

const initialNodes = [
  {
    id: '2',
    type: 'baseNodeFull',
    position: { x: 200, y: 200 },
    data: {},
  },
];

const fitViewOptions = {
  padding: 100,
};

const initialEdges = [];

let id = 3;
const getId = () => `${id++}`;

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
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type: 'baseNodeFull',
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="app-wrapper">
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
        fitViewOptions={fitViewOptions}
        deleteKeyCode={['Delete', 'Backspace']}
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
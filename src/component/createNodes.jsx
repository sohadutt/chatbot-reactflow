import { useCallback, useState } from 'react';
import '../App.css';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


function CreateNodes({ setNodes, getId }) {
  const addSendMessageNode = () => {
    const newNode = {
      id: getId(),
      data: { label: 'Send Message' },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      style: { backgroundColor: '#e6f7ff', padding: 10, borderRadius: 8 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addUserResponseNode = () => {
    const newNode = {
      id: getId(),
      data: { label: 'User Response' },
      position: { x: Math.random() * 300 + 300, y: Math.random() * 300 },
      style: { backgroundColor: '#fff7e6', padding: 10, borderRadius: 8 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <>
      <button className="add-btn" onClick={addSendMessageNode}>
        ➕ Send Message
      </button>
      <button className="add-btn" onClick={addUserResponseNode}>
        ➕ User Response
      </button>
    </>
  );
}

export default CreateNodes;
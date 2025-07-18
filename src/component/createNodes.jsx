import { useCallback, useState } from 'react';
import '../App.css';
import '@xyflow/react/dist/style.css';


function CreateNodes({ setNodes, getId }) {
  const addSendMessageNode = () => {
    const newNode = {
      id: getId(),
      data: { label: 'Send Message' },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      style: { backgroundColor: '#e6f7ff', padding: 10, borderRadius: 8 },
      type: 'input',
      className: 'user-response-node',
      label: 'Send Message',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <>
      <button className="add-btn" onClick={addSendMessageNode}>
        ➕ New Node
      </button>
    </>
  );
}

export default CreateNodes;
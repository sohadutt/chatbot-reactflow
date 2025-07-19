import '../App.css';

function CreateNodes({ setNodes, getId }) {
  const addCustomNode = () => {
    const newId = getId();
    const newNode = {
      id: newId,
      type: 'baseNodeFull',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: { message: `New Text Message ${newId}` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <button className="add-btn" onClick={addCustomNode}>
      ➕ New Node
    </button>
  );
}

export default CreateNodes;

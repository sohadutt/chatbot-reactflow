import '../App.css';

function CreateNodes({ setNodes, getId }) {
  const addCustomNode = () => {
    const newNode = {
      id: getId(),
      type: 'baseNodeFull',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: {},
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

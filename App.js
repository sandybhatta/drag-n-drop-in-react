import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggingIndex(index);
  };

  const handleDragEnter = (e, index) => {
    if (draggingIndex === index) return;
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDraggingIndex(index);
    setItems(newItems);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggingIndex(null);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          style={{
            padding: '8px',
            margin: '4px',
            backgroundColor: draggingIndex === index ? '#f0f0f0' : '#fff',
            border: '1px solid #ddd',
            cursor: 'move',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default App;
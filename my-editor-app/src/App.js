// App.js
import React from 'react';
import Title from './components/Title';
import Button from './components/Button';
import Editor from './components/Editor';
import 'draft-js/dist/Draft.css';

function App() {
  const handleSave = () => {
    alert('Content saved!');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '50%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin:'1rem 0' }}>
          <Title name='Abhijeet' />
          <Button onClick={handleSave} label="Save" />
        </div>
        <Editor />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tareas from './tareas/Tareas';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestion de tareas</h1>
      </header>
      <Tareas></Tareas>
    </div>
  );
}

export default App;

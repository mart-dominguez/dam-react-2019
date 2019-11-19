import React from 'react';
import logo from './logo.svg';
import './App.css';
import TareasApiRest from './tareas/TareasApiRest';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestion de tareas</h1>
      </header>
      <TareasApiRest></TareasApiRest>
    </div>
  );
}

export default App;

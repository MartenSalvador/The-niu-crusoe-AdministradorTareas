
import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './componentes/Nav';
import AdministradorTareas from './componentes/AdministradorTareas';
import Habitaciones from './componentes/Habitaciones';

function App() {

  

  return (
    <div className="app-container">
      <Nav />
      <Routes>
        <Route path="/" element={<AdministradorTareas />} />
        <Route path="/habitaciones" element={<Habitaciones />} /> 
      </Routes>
      <footer>
        <p>&copy; 2025 Administrador de Tareas The Niu Crusoe - Bremen</p>
      </footer>
    </div>
  );
}

export default App

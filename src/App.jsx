
import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './componentes/Nav';
import AdministradorTareas from './componentes/AdministradorTareas';
import Habitaciones from './componentes/Habitaciones';
import Login from './componentes/Login';
import ProtectedRoute from './componentes/ProtectedRoute';

function App() {



  return (
    <div className="app-container">
      <Nav />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={

            <ProtectedRoute>
              <AdministradorTareas />
            </ProtectedRoute>
          } />

        <Route
          path="/habitaciones"
          element={
            <ProtectedRoute>
              <Habitaciones />
            </ProtectedRoute>
          } />
      </Routes>
      <footer>
        <p>&copy; 2025 Administrador de Tareas The Niu Crusoe - Bremen</p>
      </footer>
    </div>
  );
}

export default App

import React from "react";

import { Link } from "react-router-dom";
import '../estilos/Nav.css';

function Nav() {
  return (
    <nav className="nav">
      <Link to="/" >Administrador de tareas</Link>
      <Link to="/habitaciones">Check de Habiraciones</Link>
    </nav>
  );

}

export default Nav;
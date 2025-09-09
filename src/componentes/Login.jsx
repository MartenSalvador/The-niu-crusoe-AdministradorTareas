import React from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase"; // 👈 tu configuración de firebase.js

function Login() {
  const provider = new GoogleAuthProvider();

  // Iniciar sesión con Google
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Administrador de Tareas</h2>
      <p>Inicia sesión con tu cuenta de Google</p>

      <button onClick={handleLogin} style={{ margin: "1rem", padding: "0.5rem 1rem" }}>
        Iniciar sesión con Google
      </button>

      <button onClick={handleLogout} style={{ margin: "1rem", padding: "0.5rem 1rem" }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Login;

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [user] = useAuthState(auth);

  if (user) {
    return <Navigate to="/" />; // Si ya está logueado, va al inicio
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <button onClick={loginWithGoogle}>Ingresar con Google</button>
    </div>
  );
}

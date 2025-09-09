import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // te ayuda a escuchar el usuario

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Cargando...</p>; // mientras se valida el login
  }

  if (!user) {
    // Si no hay usuario logueado, redirige a /login
    return <Navigate to="/login" />;
  }

  // Si está logueado, muestra la ruta protegida
  return children;
}

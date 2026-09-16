import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MainLayout } from "../layout/MainLayout";

export const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Espera a que la sesión cargue

  return user ? <MainLayout>{element}</MainLayout> : <Navigate to="/login" replace />;
};

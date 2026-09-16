import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, getSession } from "../features/auth/api/authService";
import { LoadingInventiory } from "../components/LoadingInventiory";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const userData = await getSession();
        if (isMounted) {
          if (userData) {
            setUser(userData);
          } else if (user && location.pathname !== "/login") {
            setSessionExpired(true);

            // Esperamos 3 segundos y luego redirigimos
            setTimeout(async () => {
              await logout();
              setUser(null); // Limpiar usuario
              setSessionExpired(false); // Evitar bucles
              navigate("/login", { replace: true });
            }, 3000);
          }
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkSession(); // Ejecutar al montar

    const interval = setInterval(checkSession, 60000); // Ejecutar cada minuto
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigate, location.pathname]); // Eliminamos `user` de las dependencias

  // 🔹 Función para iniciar sesión
  const loginUser = async (email, password) => {
    const userData = await login(email, password);
    setUser(userData);
    setSessionExpired(false); // Restablecer el estado si el usuario vuelve a iniciar sesión
    return userData;
  };

  if (loading || !animationFinished) {
    return <LoadingInventiory onFinish={() => setAnimationFinished(true)} />;
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {/* 🔹 Modal de sesión expirada */}
      <Modal show={sessionExpired} centered>
        <Modal.Body className="text-center">
          <h5>Sesión expirada</h5>
          <p>Tu sesión ha expirado. Serás redirigido al inicio de sesión.</p>
        </Modal.Body>
      </Modal>

      {children}
    </AuthContext.Provider>
  );
};

// ✅ Exportación corregida para evitar errores de Vite
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};


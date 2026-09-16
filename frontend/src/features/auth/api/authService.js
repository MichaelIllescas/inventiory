import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/auth`;

// 🔹 Función para iniciar sesión
const login = async (email, password) => {
  const response =await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true } // Permite enviar y recibir cookies HTTP-only
  );
  return response.data; // Retorna los datos del usuario
};

// 🔹 Función para cerrar sesión
const logout = async () => {
  await axios.post(
    `${API_URL}/logout`,
    {},
    { withCredentials: true }
  );
};

// 🔹 Función para verificar si hay una sesión activa
const getSession = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return response.data; // Retorna la info del usuario autenticado
  } catch {
    return null; // Si no hay sesión, retorna null
  }
};

export  {
  login,
  logout,
  getSession
};

import { useState } from "react";
import apiClient from "../../../config/axiosConfig";

export function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post(`/user/userRegister`, userData);

      // Axios ya lanza errores si el status es 4xx o 5xx, por lo que no necesitamos verificar `response.ok`
      if (response.status >= 200 && response.status < 300) {
        return true; // 🔹 Ahora retornamos `true` en caso de éxito
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar el usuario");
      return false; // 🔹 Retornamos `false` en caso de error
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, setError };
}

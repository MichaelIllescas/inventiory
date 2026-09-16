import { useState } from "react";
import apiClient from "../../../config/axiosConfig";

export function useRegisterFromLandingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUserFree = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post(`/subsciption/registerFreeTrialUSer`, userData);

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

  const registerUserPro = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post(`/subsciption/registerProUSer`, userData);

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

  return { registerUserFree,registerUserPro, loading, error, setError };
}

import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useChangeUserState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeUserState = async (id, newState) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/user/${id}/state`, { state: newState });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || "Error al cambiar el estado del usuario");
      throw new Error(error.response?.data?.error || "Error al cambiar el estado del usuario");
    } finally {
      setLoading(false);
    }
  };

  return { changeUserState, loading, error };
};

export default useChangeUserState;

import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener los datos del usuario (debe ser llamada manualmente)
  const fetchUserProfile = async () => {

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/user/getUserSession`);
      return response.data; 
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener el usuario");
      return null; 
    } finally {
      setLoading(false);
    }
  };

  return { fetchUserProfile, loading, error };
};

export default useUserProfile;

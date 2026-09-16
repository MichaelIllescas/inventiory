import { useState } from "react";
import apiClient from "../../../config/axiosConfig";

export const useRegisterClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registrationClient = async (clientData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/clients/clientRegister", clientData);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registrationClient, loading, error };
};

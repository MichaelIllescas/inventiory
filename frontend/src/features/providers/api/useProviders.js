import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener proveedores desde el backend
  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/providers/getProviders"); 
      setProviders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener proveedores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return { providers, setProviders, loading, error, fetchProviders }; // 🔹 Ahora devuelve `setProviders`
};

export default useProviders;

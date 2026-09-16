import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useProviders = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener proveedores desde el backend
  const fetchSales = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/sales/getAll"); 
      setSales(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener proveedores");
    } finally {
      setLoading(false);
    }
  };



  return { sales, setSales, loading, error, fetchSales }; // 🔹 Ahora devuelve `setProviders`
};

export default useProviders;

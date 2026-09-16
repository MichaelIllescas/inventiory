import { useState, useCallback } from "react";
import apiClient from "../../../Config/axiosConfig";

const useTopCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopCustomers = useCallback(async (month) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/top-customers?month=${month}`);
      setCustomers(response.data);
    } catch (err) {
      setError("Error al obtener los clientes con más compras.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { customers, loading, error, fetchTopCustomers, setCustomers };
};

export default useTopCustomers;

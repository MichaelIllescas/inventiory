import { useState, useCallback } from "react";
import apiClient from "../../../Config/axiosConfig";

const useInventoryAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventoryAnalysis = useCallback(async (months) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/inventory-analysis?months=${months}`);
      setAnalysis(response.data);
    } catch (err) {
      setError("Error al obtener el análisis de inventario.");
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { analysis, loading, error, fetchInventoryAnalysis, setAnalysis };
};

export default useInventoryAnalysis;

import { useState, useCallback } from "react";
import apiClient from "../../../config/axiosConfig";

const useExpenseAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalysis = useCallback(async (period, value) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/expense-analysis?period=${period}&value=${value}`);
      setAnalysis(response.data);
    } catch (err) {
      setError("Error al obtener el análisis de gastos.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { analysis, loading, error, fetchAnalysis };
};

export default useExpenseAnalysis;

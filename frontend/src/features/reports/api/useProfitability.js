import { useState, useCallback } from "react";
import apiClient from "../../../Config/axiosConfig";

const useProfitability = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfitability = useCallback(async (year) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/profitability?year=${year}`);
      setData(response.data);
    } catch (err) {
      setError("Error al obtener los datos de rentabilidad.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchProfitability, setData };
};

export default useProfitability;

import { useState, useCallback } from "react";
import apiClient from "../../../Config/axiosConfig";

const useAnnualIncome = () => {
  const [income, setIncome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnnualIncome = useCallback(async (year) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/annual-income?year=${year}`);
      setIncome(response.data);
    } catch (err) {
      setError("Error al obtener los ingresos anuales.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { income, loading, error, fetchAnnualIncome, setIncome };
};

export default useAnnualIncome;

import { useState, useCallback } from "react";
import apiClient from "../../../Config/axiosConfig";

const useMonthlyIncome = () => {
  const [income, setIncome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMonthlyIncome = useCallback(async (month) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/monthly-income?month=${month}`);
      setIncome(response.data);
    } catch (err) {
      setError("Error al obtener los ingresos mensuales.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { income, loading, error, fetchMonthlyIncome, setIncome };
};

export default useMonthlyIncome;

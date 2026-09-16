import { useState, useCallback } from "react";
import apiClient from "../../../Config/axiosConfig";

const useDailyIncome = () => {
  const [income, setIncome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDailyIncome = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/daily-income?date=${date}`);
      setIncome(response.data);
    } catch (err) {
      setError("Error fetching daily income.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { income, loading, error, fetchDailyIncome, setIncome };
};

export default useDailyIncome;

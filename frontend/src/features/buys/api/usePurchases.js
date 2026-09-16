import { useState, useCallback } from "react";
import axios from "axios";
import apiClient from "../../../Config/axiosConfig";

const usePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/purchases/getPurchases");
      setPurchases(response.data);
    } catch (err) {
      setError("Error al obtener las compras.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { purchases, loading, error, fetchPurchases, setPurchases };
};

export default usePurchases;
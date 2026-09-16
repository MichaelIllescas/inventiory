import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../config/axiosConfig";

const useStockMovements = (productId, enabled = true) => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovements = useCallback(async () => {
    if (!productId || !enabled) return;
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/product/${productId}/stock-movements`);
      setMovements(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo obtener el historial de stock.");
    } finally {
      setLoading(false);
    }
  }, [productId, enabled]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return { movements, loading, error, fetchMovements };
};

export default useStockMovements;

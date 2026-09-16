import { useState } from "react";
import apiClient from "../../../config/axiosConfig";

const useRegisterStockMovement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerStockMovement = async (productId, movement) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(`/product/${productId}/stock-movements`, movement);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.error || "No se pudo registrar el movimiento.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { registerStockMovement, loading, error };
};

export default useRegisterStockMovement;

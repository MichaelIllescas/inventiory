import { useState } from "react";
import apiClient from '../../../config/axiosConfig'

export const useRegisterPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerPurchase = async (purchaseData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await  apiClient.post(
        `/purchases/register`,
        purchaseData
      );
      return response.data; // Retorna la respuesta del backend (ej.: confirmación)
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar la compra.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerPurchase, loading, error, setError };
};

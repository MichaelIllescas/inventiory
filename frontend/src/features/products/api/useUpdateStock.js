import { useState } from "react";
import apiClient from "../../../Config/axiosConfig"; // Asegúrate de que la configuración de Axios está en este archivo.

const useUpdateStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStock = async (productId, newStock) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.patch(`/product/${productId}/stock`, {
        stock: newStock, 
      });

      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || "Error al actualizar el stock");
      throw new Error(error.response?.data?.error || "Error al actualizar el stock");
    } finally {
      setLoading(false);
    }
  };

  return { updateStock, loading, error };
};

export default useUpdateStock;

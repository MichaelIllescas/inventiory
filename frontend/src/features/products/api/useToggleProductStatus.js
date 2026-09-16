import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useToggleProductStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleStatus = async (productId, newStatus) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.patch(`/product/toggleStatus/${productId}`, {
        status: newStatus,
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Error al cambiar el estado del producto");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { toggleStatus, loading, error };
};

export default useToggleProductStatus;

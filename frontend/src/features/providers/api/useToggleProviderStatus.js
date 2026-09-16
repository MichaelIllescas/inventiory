import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useToggleProviderStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleStatus = async (providerId, newStatus) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.patch(`/providers/toggleStatus/${providerId}`, {
        status: newStatus,
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Error al cambiar el estado del proveedor");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { toggleStatus, loading, error };
};

export default useToggleProviderStatus;

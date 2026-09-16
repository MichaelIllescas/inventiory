import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useChangeStatusSale = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeStatus = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.patch(`/sales/change-status/${id}`);
      return response.data; // Retornamos solo los datos de la respuesta
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar el estado de la venta");
      return { error: err.response?.data?.message || "Error al cambiar el estado de la venta" };
    } finally {
      setLoading(false);
    }
  };

  return { changeStatus, loading, error };
};

export default useChangeStatusSale;

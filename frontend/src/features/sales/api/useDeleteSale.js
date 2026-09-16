import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useDelete = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener proveedores desde el backend
  const deleteSale = async (id) => {
    try {
      setLoading(true);

      setError(null);
      const response = await apiClient.delete(`/sales/delete/${id}`);
      return response;
    } catch (err) {
        setError(err.response?.data?.error || "Error al eliminar la venta");
        return { error: err.response?.data?.error || "Error al eliminar la venta" }; 
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteSale };
};

export default useDelete;

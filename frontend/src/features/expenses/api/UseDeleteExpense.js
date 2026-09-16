import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useDeleteExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteExpense = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/expenses/${id}`); 
    } catch (err) {
      setError(err.response?.data?.error || "Error al eliminar el gasto");
      throw new Error(err.response?.data?.error || "Error al eliminar el gasto");
    } finally {
      setLoading(false);
    }
  };

  return { deleteExpense, loading, error };
};

export default useDeleteExpense;

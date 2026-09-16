import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";
import { format, isValid, parseISO } from "date-fns";

const useRegisterExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Función para formatear la fecha a "dd/MM/yyyy"
  const formatDateToDDMMYYYY = (date) => {
    if (!date) return null;
    try {
      const parsedDate = new Date(date);
      if (!isValid(parsedDate)) throw new Error("Fecha inválida");
      return format(parsedDate, "dd/MM/yyyy"); // Enviamos el formato esperado por el backend
    } catch (error) {
      console.error("❌ Error al formatear la fecha:", error);
      return null;
    }
  };

  const registrationExpense = async (expenseData) => {
    setLoading(true);
    setError(null);

    try {
      // 🔹 Convertimos la fecha antes de enviarla si existe
      const formattedExpense = {
        ...expenseData,
        expenseDate: expenseData.expenseDate
          ? formatDateToDDMMYYYY(expenseData.expenseDate)
          : null,
      };

     

      const response = await apiClient.post("/expenses/register", formattedExpense);

      return response.data;
    } catch (err) {
   
      setError(err.response?.data?.error || "Error al registrar el gasto");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registrationExpense, loading, error };
};

export default useRegisterExpense;

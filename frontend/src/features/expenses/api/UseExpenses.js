import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Función mejorada para formatear fecha a "DD/MM/YYYY"
  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return ""; // Manejo seguro de valores null/undefined

    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) {
      console.error("❌ Error al formatear la fecha:", dateString);
      return "";
    }

    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ✅ Función para obtener los gastos y formatear las fechas
  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/expenses/getAll");

      
      const formattedExpenses = response.data.map((expense) => ({
        ...expense,
        date: expense.date, // ✅ Usamos la fecha tal cual la envía el backend
      }));
      

      setExpenses(formattedExpenses);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener los gastos");
    } finally {
      setLoading(false);
    }
  };



  return { expenses, loading, error, fetchExpenses };
};

export default useExpense;

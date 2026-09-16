// src/features/expenses/api/useFilter.js
import { useState } from "react";
import apiClient from "../../../Config/axiosConfig"; // Asegúrate de tener la ruta correcta

const useFilter = (fetchExpenses) => {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Función para formatear fecha a "DD/MM/YYYY"
  const formatDate = (date) => {
    if (!date) return null;
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ✅ Filtrar gastos desde el backend
  const filterExpenses = async (startDate, endDate, setToast) => {
    if (!startDate || !endDate) {
      setToast({
        show: true,
        title: "Error",
        message: "Debes seleccionar un rango de fechas",
        variant: "danger",
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);

      console.log("📤 Enviando petición con fechas:", formattedStart, formattedEnd);

      const response = await apiClient.get("/expenses/filter", {
        params: { startDate: formattedStart, endDate: formattedEnd },
      });

      console.log("✅ Respuesta del backend:", response.data);

      setFilteredExpenses(response.data);

      if (response.data.length === 0) {
        setToast({
          show: true,
          title: "Sin resultados",
          message: "No hay gastos en el rango de fechas seleccionado",
          variant: "warning",
        });
      }
    } catch (error) {
      console.error("❌ Error en la petición:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Error al filtrar los gastos");
      setToast({
        show: true,
        title: "Error",
        message: error.response?.data?.error || "Error al filtrar los gastos",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Restaurar la tabla sin filtros
  const clearFilter = () => {
    setFilteredExpenses([]);
    fetchExpenses(); // 🔹 Volver a traer todos los gastos
  };

  return {
    filteredExpenses,
    loading,
    error,
    filterExpenses,
    clearFilter,
  };
};

export default useFilter;

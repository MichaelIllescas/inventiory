import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig"; // Asegúrate de importar tu configuración de Axios

const useLowStockProducts = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLowStockProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/product/low-stock"); // 🔹 Ruta del backend para obtener productos con stock bajo
      setLowStockProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener productos con stock bajo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  return { lowStockProducts, loading, error, fetchLowStockProducts };
};

export default useLowStockProducts;

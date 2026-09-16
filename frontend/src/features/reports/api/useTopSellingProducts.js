import { useState, useCallback } from "react";
import apiClient from "../../../Config/axiosConfig";

const useTopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopSellingProducts = useCallback(async (month) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/top-selling-products?month=${month}`);
      setProducts(response.data);
    } catch (err) {
      setError("Error al obtener los productos más vendidos.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { products, loading, error, fetchTopSellingProducts, setProducts };
};

export default useTopSellingProducts;

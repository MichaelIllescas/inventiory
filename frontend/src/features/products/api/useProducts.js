import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/product/getProducts");
      setProducts(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Error desconocido al obtener productos.");
    } finally {
      setLoading(false);
    }
  };


  return { products, setProducts, loading, error, fetchProducts }; 
};

export default useProducts;

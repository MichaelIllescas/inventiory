import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompany = async () => {

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/companies/getCompany`);
      return response.data; 
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener el usuario");
      return null; 
    } finally {
      setLoading(false);
    }
  };

  return { fetchCompany, loading, error };
};

export default useCompany;

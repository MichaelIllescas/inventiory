// src/hooks/api/useCreateCompany.js
import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useCreateCompany = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCompany = async (companyData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/companies/register", companyData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar la empresa");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCompany, loading, error };
};

export default useCreateCompany;

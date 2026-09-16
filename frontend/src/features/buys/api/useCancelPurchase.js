import { useState } from "react";
import axios from "axios";
import apiClient from "../../../Config/axiosConfig";

const useCancelPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePurchase = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/purchases/delete/${id}`);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deletePurchase, loading, error };
};

export default useCancelPurchase;

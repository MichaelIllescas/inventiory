import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useModifyPrice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modifyPrices = async (productIds, priceType, percentage, action) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.put("/product/modify-prices", {
        productIds: productIds,
        priceType: priceType,
        percentage: percentage,
        action: action, // 🔥 "increase" o "discount"
      });

      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || "Error al modificar los precios");
      throw new Error(error.response?.data?.error || "Error al modificar los precios");
    } finally {
      setLoading(false);
    }
  };

  return { modifyPrices, loading, error };
};

export default useModifyPrice;

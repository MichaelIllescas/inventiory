import axios from "axios";
import apiClient from "../../../Config/axiosConfig";

const useUpdatePurchase = () => {
  const updatePurchase = async (purchase) => {
    try {
      const response = await apiClient.put(`/purchases/${purchase.id}`, purchase);
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar la compra");
    }
  };

  return { updatePurchase };
};

export default useUpdatePurchase;

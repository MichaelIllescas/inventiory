import axios from "axios";
import apiClient from "../../../Config/axiosConfig";

const useTogglePurchaseStatus = () => {
  const toggleStatus = async (id, newStatus) => {
    try {
      const response = await apiClient.patch(`/purchases/${id}/status`);
      return response.data;
    } catch (error) {
      throw new Error("Error al cambiar el estado de la compra");
    }
  };

  return { toggleStatus };
};

export default useTogglePurchaseStatus;

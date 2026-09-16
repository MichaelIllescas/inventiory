import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useRegisterSale = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const registerSale = async ({ products, discount, paymentMethod, clientId,  extra_charge_percentage  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const saleData = {
        products: products.map((product) => ({
          productId: product.id,
          quantity: product.cantidad,
        })),
        discountApplied: discount,
        paymentMethod,
        clientId: clientId || null, 
        extra_charge_percentage 
      };

      await apiClient.post("/sales/register", saleData);

      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Error desconocido al registrar la venta.");
    } finally {
      setLoading(false);
    }
  };

  return { registerSale, loading, error, success };
};

export default useRegisterSale;

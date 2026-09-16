import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

export const useRegisterProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registrationProduct = async (productData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post("/product/register", productData);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.error || "Error desconocido al registrar el producto.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { registrationProduct, loading, error };
};

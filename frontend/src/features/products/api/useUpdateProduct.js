import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProduct = async (productData) => {
        setLoading(true);
        setError(null);
        try {
            // 🔥 Extraer `id` y enviar solo los datos necesarios
            const { id, ...sanitizedData } = productData;

            const response = await apiClient.put(
                `/product/${id}`, 
                sanitizedData      
            );

            return response.data;
        } catch (error) {
            setError(error.response?.data?.error || "Error al actualizar el producto");
            throw new Error(error.response?.data?.error || "Error al actualizar el producto");
        } finally {
            setLoading(false);
        }
    };

    return { updateProduct, loading, error };
};

export default useUpdateProduct;

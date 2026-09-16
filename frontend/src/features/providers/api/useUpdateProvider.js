import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useUpdateProvider = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProvider = async (providerData) => {
        setLoading(true);
        setError(null);
        try {
            // 🔥 Eliminar `id` del body, pero usarlo en la URL
            const { id, ...sanitizedData } = providerData;

            const response = await apiClient.put(
                `/providers/${id}`, // ✅ ID en la URL
                sanitizedData       // ✅ Solo los datos válidos en el body
            );

            return response.data;
        } catch (error) {
            setError(error.response?.data?.error || "Error al actualizar el proveedor");
            throw new Error(error.response?.data?.error || "Error al actualizar el proveedor");
        } finally {
            setLoading(false);
        }
    };

    return { updateProvider, loading, error };
};

export default useUpdateProvider;

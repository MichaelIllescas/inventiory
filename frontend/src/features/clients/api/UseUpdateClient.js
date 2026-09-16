import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useUpdateClient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateClient = async (clientData) => {
        setLoading(true);
        setError(null);
        try {
            // 🔥 Eliminar `id` del body, pero usarlo en la URL
            const { id, ...sanitizedData } = clientData;

            const response = await apiClient.put(
                `/clients/${id}`, // ✅ ID en la URL
                sanitizedData       // ✅ Solo los datos válidos en el body
            );

            return response.data;
        } catch (error) {
            setError(error.response?.data?.error || "Error al actualizar el cliente");
            throw new Error(error.response?.data?.error || "Error al actualizar el cliente");
        } finally {
            setLoading(false);
        }
    };

    return { updateClient, loading, error };
};

export default useUpdateClient;

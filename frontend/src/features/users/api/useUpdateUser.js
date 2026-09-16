import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.put(
                `/user/${userData.id}`, 
                userData
            );
            return response.data;
        } catch (error) {
            setError(error.response?.data?.error || "Error al actualizar el usuario");
            throw new Error(error.response?.data?.error || "Error al actualizar el usuario");
        } finally {
            setLoading(false);
        }
    };

    return { updateUser, loading, error };
};

export default useUpdateUser;

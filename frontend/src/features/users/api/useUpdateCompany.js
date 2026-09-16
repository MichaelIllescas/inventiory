import { useState } from "react";
import apiClient from "../../../Config/axiosConfig";

const useUpdateCompany = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCompany = async (companyData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.put(
                `/companies/${companyData.id}`, 
                companyData
            );
            return response.data;
        } catch (error) {
            setError(error.response?.data?.error || "Error al actualizar la compañía");
            throw new Error(error.response?.data?.error || "Error al actualizar la compañía.");
        } finally {
            setLoading(false);
        }
    };

    return { updateCompany, loading, error };
};

export default useUpdateCompany;

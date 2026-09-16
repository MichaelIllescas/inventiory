import { useState } from 'react';
import axios from 'axios';
import apiClient from '../../../Config/axiosConfig';

const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const changePassword = async (currentPassword, newPassword, repeatPassword) => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await apiClient.post(`/user/change-password`, {
                currentPassword,
                newPassword,
                repeatPassword
            }, { withCredentials: true }); 

           setSuccess(true);
        } catch (err) {
            setError(err.response?.data.error || "Error al cambiar la contraseña");
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error, success ,setError, setSuccess};
};

export default useChangePassword;

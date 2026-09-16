import {useState} from "react";
import apiClient from "../../../config/axiosConfig" 


export const useRegisterProvider = ()=>{

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registrationProvider = async (providerData)=>{
        setLoading(true)
        setError(false)

        try {
            const response = await apiClient.post("/providers/providerRegister", providerData);
            return response.data;
            
        } catch (error) {
            setError(error.response.data.error || "Error desconocido")
            return null;
            
        }
        finally{
            setLoading(false)
        }
    };

    return {registrationProvider, loading, error}


}

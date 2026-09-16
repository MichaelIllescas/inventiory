import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useClientSales = (clientId) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clientId) return; // No hacer la petición si no hay cliente seleccionado

    const fetchSales = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/sales/client/${clientId}`);
        setSales(response.data);
      } catch (err) {
        setError("Error al cargar las ventas del cliente");
      }
      setLoading(false);
    };

    fetchSales();
  }, [clientId]); // Se ejecuta cuando `clientId` cambia

  return { sales, loading, error };
};

export default useClientSales;

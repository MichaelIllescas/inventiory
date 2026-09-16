import { useEffect, useState } from 'react';
import apiClient from '../../../config/axiosConfig'; // asegurate de que apunta a tu Axios configurado

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiClient.get('/dashboard/data');
        setDashboardData(response.data);
      } catch (err) {
        setError(err);
        console.error('Error al obtener datos del dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { dashboardData, loading, error };
};

export default useDashboardData;

import { useState, useEffect } from "react";
import apiClient from "../../../Config/axiosConfig";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Definimos fetchUsers fuera del useEffect para poder llamarlo después
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/user/getUsers"); // Cambia la URL según tu backend
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener los usuarios");
    } finally {
      setLoading(false);
    }
  };

  // Llamamos a fetchUsers cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers }; // Devolvemos fetchUsers para que pueda usarse en UsersPage
};

export default useUsers;

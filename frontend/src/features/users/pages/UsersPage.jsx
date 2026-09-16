import React, { useMemo, useState, useEffect } from "react";
import useUsers from "../api/useUsers";
import useUpdateUser from "../api/useUpdateUser";
import useChangeUserState from "../api/useChangeUserState"; // Nuevo hook
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditModal from "./../../../components/EditModal";
import ToastMessage from "./../../../components/ToastMessage";
import ConfirmChangeStateModal from "./ConfirmChangeStateModal";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";

const UsersPage = () => {
  const { users, loading, error, fetchUsers } = useUsers();
  const { updateUser } = useUpdateUser();
  const { changeUserState } = useChangeUserState(); // Hook para cambiar estado

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangeStateModalOpen, setIsChangeStateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchUsers(); // Cargar usuarios al montar el componente
  }, []);

  const handleEdit = (id) => {
    const user = users.find((u) => u.id === id);
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  const handleDetails = (id) => {
    setSelectedUser(users.find((u) => u.id === id));
    setIsDetailsModalOpen(true);
  };
  const handleSave = async (updatedUser) => {
    try {
      await updateUser(updatedUser);
      setToast({
        show: true,
        title: "Éxito",
        message: "Usuario actualizado correctamente",
        variant: "success",
      });
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error en handleSave:", error);

      // Intentamos extraer el mensaje de error desde diferentes fuentes
      let errorMessage = "Error desconocido al actualizar usuario";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error; // Mensaje desde la respuesta HTTP
      } else if (error.message) {
        errorMessage = error.message; // Mensaje del objeto Error
      }

      setToast({
        show: true,
        title: "Error",
        message: errorMessage,
        variant: "danger",
      });
    }
  };

  const handleChangeState = async (id, newState) => {
    try {
      await changeUserState(id, newState);
      setToast({
        show: true,
        title: "Estado actualizado",
        message: `El usuario ha sido ${
          newState === "ACTIVO" ? "activado" : "deshabilitado"
        }.`,
        variant: "success",
      });
      setIsChangeStateModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error en handleChangeState:", error);

      let errorMessage = "Error desconocido al cambiar estado";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        show: true,
        title: "Error",
        message: errorMessage,
        variant: "danger",
      });
    }
  };

  const handleChangeStateClick = (id) => {
    const user = users.find((u) => u.id === id);
    setSelectedUser(user);
    setIsChangeStateModalOpen(true);
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "NOMBRE", accessor: "firstName", Cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}` },
      { Header: "ESTADO", accessor: "state" },
      { Header: "ROL", accessor: "role" },
      { Header: "PLAN", accessor: "subscription"},
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-info btn-sm" title="Ver detalles" onClick={() => handleDetails(row.original.id)}><FaEye /></button>
            <button className="btn btn-primary btn-sm" title="Editar usuario" onClick={() => handleEdit(row.original.id)}><FaEdit /></button>
            <button className="btn btn-warning btn-sm" title="Cambiar estado" onClick={() => handleChangeStateClick(row.original.id)}>
              {row.original.state === "ACTIVO" ? <FaToggleOff /> : <FaToggleOn />}
            </button>
          </div>
        ),
      },
    ],
    [users]
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div
        className="container card mt-5 pt-5 table-responsive table"
        data-aos="fade-left"
      >
        <h2>Usuarios Registrados</h2>
        <DataTable columns={columns} data={users} />
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={selectedUser}
        onSubmit={handleSave}
      />

      <ConfirmChangeStateModal
        isOpen={isChangeStateModalOpen}
        onClose={() => setIsChangeStateModalOpen(false)}
        onConfirm={handleChangeState}
        user={selectedUser}
      />

      <Modal show={isDetailsModalOpen} onHide={() => setIsDetailsModalOpen(false)} centered>
        <Modal.Header closeButton><Modal.Title>Detalles del Usuario</Modal.Title></Modal.Header>
        <Modal.Body>{selectedUser && <div className="d-grid gap-2"><div><strong>Nombre:</strong> {selectedUser.firstName} {selectedUser.lastName}</div><div><strong>DNI:</strong> {selectedUser.documentNumber}</div><div><strong>Teléfono:</strong> {selectedUser.phone || "No informado"}</div><div><strong>Dirección:</strong> {selectedUser.address || "No informada"}</div><div><strong>Email:</strong> {selectedUser.email}</div><div><strong>Rol:</strong> {selectedUser.role}</div><div><strong>Plan:</strong> {selectedUser.subscription}</div><div><strong>Fecha de registro:</strong> {selectedUser.registrationDate}</div></div>}</Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setIsDetailsModalOpen(false)}>Cerrar</Button></Modal.Footer>
      </Modal>

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant}
      />
    </div>
  );
};

export default UsersPage;

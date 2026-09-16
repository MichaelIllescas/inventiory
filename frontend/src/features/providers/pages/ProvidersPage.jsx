import React, { useMemo, useState, useEffect } from "react";
import useProviders from "../api/useProviders";
import useUpdateProvider from "../api/useUpdateProvider";
import useToggleProviderStatus from "../api/useToggleProviderStatus";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditModal from "./EditModal";
import DetailsModal from "./DetailsModal";
import ToastMessage from "../../../components/ToastMessage";
import { Modal, Button } from "react-bootstrap";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const ProvidersPage = () => {
  const { providers, loading, error, fetchProviders, setProviders } = useProviders();
  const { updateProvider } = useUpdateProvider();
  const { toggleStatus } = useToggleProviderStatus();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleEdit = (id) => {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;
    setSelectedProvider({ ...provider });
    setIsEditModalOpen(true);
  };

  const handleDetails = (id) => {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;
    setSelectedProvider({ ...provider });
    setIsDetailsModalOpen(true);
  };

  const handleConfirmToggle = (provider) => {
    if (!provider) return;
    setSelectedProvider({ ...provider });
    setIsConfirmModalOpen(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedProvider) return;
    const newStatus = selectedProvider.state === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    try {
      const response = await toggleStatus(selectedProvider.id, newStatus);
      if (!response) throw new Error("El backend no respondió correctamente");

      setToast({
        show: true,
        title: "Éxito",
        message: `Proveedor ${newStatus === "ACTIVO" ? "Activado" : "Desactivado"} correctamente`,
        variant: "success",
      });

      setIsConfirmModalOpen(false);
      setProviders((prevProviders) =>
        prevProviders.map((p) =>
          p.id === selectedProvider.id ? { ...p, state: newStatus } : p
        )
      );
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message: "No se pudo cambiar el estado. Verifica que el backend esté funcionando.",
        variant: "danger",
      });
    }
  };

  const handleSave = async (updatedProvider) => {
    try {
      await updateProvider(updatedProvider);
      setToast({
        show: true,
        title: "Éxito",
        message: "Proveedor actualizado correctamente",
        variant: "success",
      });
      setIsEditModalOpen(false);
      fetchProviders();
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message: "No se pudo actualizar el proveedor",
        variant: "danger",
      });
    }
  };

  const columns = useMemo(
    () => [
      { Header: "NOMBRE", accessor: "name" },
      { Header: "EMAIL", accessor: "email" },
      { Header: "TELÉFONO", accessor: "phone" },
      { Header: "CONTACTO", accessor: "contactPerson" },
      { Header: "ESTADO", accessor: "state", Cell: ({ value }) => (value === "ACTIVO" ? "Activo" : "Inactivo") },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-info btn-sm" onClick={() => handleDetails(row.original.id)} title="Ver Detalles">
              🔍
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(row.original.id)} title="Editar Proveedor">
              ✏️
            </button>
            <button
              className={`btn px-2  btn-${row.original.state === "ACTIVO" ? "success" : "danger"} btn-sm`}
              onClick={() => handleConfirmToggle(row.original)}
              title={row.original.state === "ACTIVO" ? "Desactivar" : "Activar"}
            >
              {row.original.state === "ACTIVO" ? <FaToggleOff /> : <FaToggleOn />  }
            </button>
          </div>
        ),
      },
    ],
    [providers]
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive table" data-aos="fade-left">
        <h2>Proveedores Registrados</h2>
        <DataTable columns={columns} data={providers} />
      </div>
      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} data={selectedProvider} onSubmit={handleSave} />
      <DetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} data={selectedProvider} />
      <Modal show={isConfirmModalOpen} onHide={() => setIsConfirmModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambio de Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea {selectedProvider?.state === "ACTIVO" ? "desactivar" : "activar"} el proveedor <strong>{selectedProvider?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsConfirmModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant={selectedProvider?.state === "ACTIVO" ? "danger" : "success"} onClick={handleToggleStatus}>
            {selectedProvider?.state === "ACTIVO" ? "Desactivar" : "Activar"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastMessage show={toast.show} onClose={() => setToast({ ...toast, show: false })} message={toast.message} title={toast.title} variant={toast.variant} />
    </div>
  );
};

export default ProvidersPage;
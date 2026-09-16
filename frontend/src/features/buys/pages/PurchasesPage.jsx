import React, { useMemo, useState, useEffect } from "react";
import usePurchases from "../api/usePurchases";
import useUpdatePurchase from "../api/useUpdatePurchase";
import useTogglePurchaseStatus from "../api/useTogglePurchaseStatus";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditPurchaseModal from "./EditPurchaseModal";
import PurchaseDetailsModal from "./PurchaseDetailsModal";
import ToastMessage from "../../../components/ToastMessage";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";
import useCancelPurchase from "../api/useCancelPurchase";

const PurchasesPage = () => {
  const { purchases, loading, error, fetchPurchases, setPurchases } =
    usePurchases();
  const { updatePurchase } = useUpdatePurchase();
  const { toggleStatus } = useTogglePurchaseStatus();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const{ deletePurchase} = useCancelPurchase();
  const [filteredPurchases, setFilteredPurchases] = useState(purchases);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    // Actualiza la lista filtrada cuando cambian las compras
    setFilteredPurchases(filterPurchasesByDate(purchases, startDate, endDate));
  }, [purchases]);

  const handleEdit = (id) => {
    const purchase = purchases.find((p) => p.id === id);
    if (!purchase) return;
    setSelectedPurchase({ ...purchase });
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (id) => {
    const purchase = purchases.find((p) => p.id === id);
    if (!purchase) return;
    setSelectedPurchase({ ...purchase });
    setIsDetailsModalOpen(true);
  };

  const handleConfirmToggle = (purchase) => {
    if (!purchase) return;
    setSelectedPurchase({ ...purchase });
    setIsConfirmModalOpen(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedPurchase) return;
    const newStatus =
      selectedPurchase.state === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    try {
      const response = await toggleStatus(selectedPurchase.id);
      if (!response) throw new Error("El backend no respondió correctamente");

      setToast({
        show: true,
        title: "Éxito",
        message: `Compra ${
          newStatus === "ACTIVO" ? "Activada" : "Desactivada"
        } correctamente`,
        variant: "success",
      });

      setIsConfirmModalOpen(false);
      setPurchases((prevPurchases) =>
        prevPurchases.map((p) =>
          p.id === selectedPurchase.id ? { ...p, state: newStatus } : p
        )
      );
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message:
          "No se pudo cambiar el estado. Verifica que el backend esté funcionando.",
        variant: "danger",
      });
    }
  };

  const handleSave = async (updatedPurchase) => {
    try {
      await updatePurchase(updatedPurchase);
      setToast({
        show: true,
        title: "Éxito",
        message: "Compra actualizada correctamente",
        variant: "success",
      });
      setIsEditModalOpen(false);
      fetchPurchases();
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message: "No se pudo actualizar la compra",
        variant: "danger",
      });
    }
  };
  const filterPurchasesByDate = (purchases, startDate, endDate) => {
    return purchases.filter((purchase) => {
      // Convertimos la fecha de compra del formato "dd/MM/yyyy" a un objeto Date
      const [day, month, year] = purchase.purchaseDate.split("/");
      const purchaseDateObj = new Date(`${year}-${month}-${day}`);

      // Convertimos los valores de filtro a Date (si están seleccionados)
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Filtramos los datos asegurando que la fecha esté dentro del rango
      return (
        (!start || purchaseDateObj >= start) && (!end || purchaseDateObj <= end)
      );
    });
  };

  const handleFilter = () => {
    const filteredData = filterPurchasesByDate(purchases, startDate, endDate);
    setFilteredPurchases(filteredData); // Almacena los datos filtrados en el estado
  };
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredPurchases(purchases); // Restablece la lista con todas las compras
  };

  const handleClickDelete = (sale) => {
    setSelectedPurchase(sale);
    setIsConfirmDeleteModalOpen(true);
  };
  const handleDeleteSale = async () => {
    try {
      if (!selectedPurchase) return;

        const response = await deletePurchase(selectedPurchase.id);

       if (response?.error) {
      throw new Error(response.error); // Capturar el mensaje del backend
       }

      setToast({
        show: true,
        title: "Éxito",
        message: `Compra eliminada correctamente`,
        variant: "success",
      });

      setIsConfirmDeleteModalOpen(false);
      fetchPurchases();
    } catch (error) {
      let errorMessage =
        "No se pudo eliminar la compra, intente nuevamente más tarde.";

      // 🔹 Extraer mensaje del backend si está en `error.response.data.error`
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      // 🔹 Si el backend no responde con `error`, verificar `error.message`
      else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        show: true,
        title: "Error",
        message: errorMessage,
        variant: "danger",
      });

      setIsConfirmDeleteModalOpen(false);
    }
  };


  const columns = useMemo(
    () => [
      { Header: "PRDUCTO", accessor: "productName" },
      { Header: "CODIGO", accessor: "productCode" },

      {
        Header: "PRECIO DE COMPRA",
        accessor: "purchasePrice",
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      { Header: "CANTIDAD", accessor: "quantity" },
      { Header: "FECHA DE COMPRA", accessor: "purchaseDate" },

      {
        Header: "ESTADO",
        accessor: "state",
        Cell: ({ value }) => (value === "ACTIVO" ? "Activo" : "Anulado"),
      },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-info"
              onClick={() => handleViewDetails(row.original.id)}
              title="Ver Detalles"
            >
              <FaEye />
            </button>
            <button
              className="btn btn-primary "
              onClick={() => handleEdit(row.original.id)}
              title="Editar Compra"
            >
              <FaEdit />
            </button>
           
            {/* Botón para eliminar venta */}
            <button
              className="btn btn-danger"
              title="Eliminar Registro"
              onClick={() => handleClickDelete(row.original)}
            >
              🗑️
            </button>
          </div>
        ),
      },
    ],
    [purchases]
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div
        className="container card mt-5 pt-5 table-responsive table"
        data-aos="fade-left"
      >
        <h2>Compras Registradas</h2>

              {/* Filtros por fecha */}
              <div className="d-flex gap-3 mb-3 div-filter">
            <div className="mx-3 mt-3 d-flex div-inputs-filter">
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="form-control "
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="align-self-end div-btn-filter">
              <button className="btn btn-primary me-2" onClick={handleFilter}>
                Filtrar
              </button>

              <button className="btn btn-warning" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>

        <DataTable columns={columns} data={filteredPurchases || []} />
      </div>

      <EditPurchaseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        purchaseData={selectedPurchase}
        onSubmit={handleSave}
      />
      <PurchaseDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        purchase={selectedPurchase}
      />

      {/* <Modal
        show={isConfirmModalOpen}
        onHide={() => setIsConfirmModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambio de Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea{" "}
          {selectedPurchase?.state === "ACTIVO" ? "Anular" : "Activar"} la
          compra <strong>{selectedPurchase?.code}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant={
              selectedPurchase?.state === "ACTIVO" ? "danger" : "success"
            }
            onClick={handleToggleStatus}
          >
            {selectedPurchase?.state === "ACTIVO" ? "Anular" : "Activar"}
          </Button>
        </Modal.Footer>
      </Modal> */}

<Modal
        show={isConfirmDeleteModalOpen}
        onHide={() => setIsConfirmDeleteModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación de la compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar esta compra?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsConfirmDeleteModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteSale}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>


      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant}
        delay={5000}
      />
    </div>
  );
};

export default PurchasesPage;

import React, { useEffect, useMemo, useState } from "react";
import { FaToggleOn, FaToggleOff, FaTrashAlt } from "react-icons/fa";
import useSales from "../api/useSales";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import DetailsModal from "./DetailsModal";
import ToastMessage from "../../../components/ToastMessage";
import { Modal, Button } from "react-bootstrap";
import useDelete from "../api/useDeleteSale";
import useChangeStatusSale from "../api/useChangeStatusSale";
import BtnDownloadResume from "./BtnDownloadResume";

const SalesPage = () => {
  const { sales, loading, error, fetchSales, setSales } = useSales();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalChangeState, setmodalChangeState] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const { deleteSale } = useDelete();
  const { changeStatus } = useChangeStatusSale();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });
  const [filteredSales, setFilteredSales] = useState(sales);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const columns = useMemo(
    () => [
      { Header: "CODIGO", accessor: "id" },
      {
        Header: "CLIENTE",
        accessor: "client",
        Cell: ({ value }) =>
          value ? `${value.name} ${value.lastname}` : "Sin Cliente",
      },

      { Header: "FECHA DE VENTA", accessor: "saleDate" },
      {
        Header: "MONTO",
        accessor: "totalSale",
        Cell: ({ value }) => `$${value}`,
      },
      { Header: "ESTADO", accessor: "status" },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex gap-2 justify-content-center align-items-center">
            {/* Botón para ver detalles */}
            <button
              className="btn btn-info btn-sm"
              onClick={() => handleDetails(row.original.id)}
              title="Ver Detalles"
              style={{ padding: "5px" }}
            >
              🔍
            </button>

            {/* Botón para descargar PDF */}
            <BtnDownloadResume data={row.original} />

            {/* Botón para eliminar venta */}
            <button
              className="btn btn-danger btn-sm px-2"
              title="Eliminar Registro"
              onClick={() => handleClickDelete(row.original)}
              style={{ padding: "5px" }}
            >
              🗑️
            </button>
          </div>
        ),
      },
    ],
    [sales]
  );

  useEffect(() => {
    fetchSales();
  }, []);
  useEffect(() => {
    // Actualiza la lista filtrada cuando cambian las compras
    setFilteredSales(filterPurchasesByDate(sales, startDate, endDate));
  }, [sales]);

  const handleDetails = (id) => {
    const sale = sales.find((p) => p.id === id);
    if (!sale) return;
    setSelectedSale({ ...sale });
    setIsDetailsModalOpen(true);
  };

  const handleConfirmToggle = (sale) => {
    setSelectedSale(sale);
    setmodalChangeState(true);
  };

  const handleToggleStatus = async (sale) => {
    if (!selectedSale) return;
    try {
      const response = await changeStatus(selectedSale.id);
      if (response?.error) {
        throw new Error(response.error);
      }
      setToast({
        show: true,
        title: "Éxito",
        message: `Cambio de estado realizado correctamente`,
        variant: "success",
      });
      setmodalChangeState(false);
      fetchSales();
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message:
          "No se pudo cambiar el estado de la venta, intente nuevamente mas tarde.",
        variant: "danger",
      });
      setmodalChangeState(false);
    }
  };

  const handleClickDelete = (sale) => {
    setSelectedSale(sale);
    setIsConfirmDeleteModalOpen(true);
  };
  const handleDeleteSale = async () => {
    try {
      if (!selectedSale) return;

      const response = await deleteSale(selectedSale.id);

      if (response?.error) {
        throw new Error(response.error); // Capturar el mensaje del backend
      }

      setToast({
        show: true,
        title: "Éxito",
        message: `Venta eliminada correctamente`,
        variant: "success",
      });

      setIsConfirmDeleteModalOpen(false);
      fetchSales();
    } catch (error) {
      let errorMessage =
        "No se pudo eliminar la venta, intente nuevamente más tarde.";

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

  const filterPurchasesByDate = (sales, startDate, endDate) => {
    return sales.filter((sale) => {
      if (!sale.saleDate) return false; // Si no hay fecha, ignorar el registro

      let saleDateObj;
      if (sale.saleDate.includes("/")) {
        // Si el formato es "dd/MM/yyyy"
        const [day, month, year] = sale.saleDate.split("/");
        saleDateObj = new Date(`${year}-${month}-${day}`);
      } else {
        // Si el formato es "yyyy-MM-dd" (más probable en API)
        saleDateObj = new Date(sale.saleDate);
      }

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || saleDateObj >= start) && (!end || saleDateObj <= end);
    });
  };

  const handleFilter = () => {
    const filteredData = filterPurchasesByDate(sales, startDate, endDate);
    setFilteredSales(filteredData); // Almacena los datos filtrados en el estado
  };
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredSales(sales); // Restablece la lista con todas las compras
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="mt-3 pt-1">
        <div
          className="container card mt-5 pt-5 table-responsive table"
          data-aos="fade-left"
        >
          <h2>Ventas Registradas</h2>
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
                Limpiar Filtro
              </button>
            </div>
          </div>

          <DataTable columns={columns} data={filteredSales || []} />
        </div>
      </div>

      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        data={selectedSale}
      />

      <Modal
        show={isConfirmDeleteModalOpen}
        onHide={() => setIsConfirmDeleteModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación de Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar esta venta?</Modal.Body>
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

      <Modal
        show={modalChangeState}
        onHide={() => setmodalChangeState(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambio de Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea{" "}
          {selectedSale?.status === "CONFIRMED" ? "anular" : "restaurar"} la
          venta seleccionada?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setmodalChangeState(false)}
          >
            Cancelar
          </Button>
          <Button
            variant={
              selectedSale?.status === "CONFIRMED" ? "danger" : "success"
            }
            onClick={() => handleToggleStatus(selectedSale)}
          >
            {selectedSale?.status === "CONFIRMED" ? "Anular" : "Restaurar"}
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
    </>
  );
};

export default SalesPage;

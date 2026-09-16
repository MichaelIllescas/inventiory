import React, { useState, useMemo } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import DataTable from "../../../components/DataTable";
import useClientSales from "../api/useClientSales";
import DetailsModal from "../../sales/pages/DetailsModal";

const SalesDetailsModal = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  // Llamamos al hook para obtener las ventas cuando el modal está abierto
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { sales, loading, error } = useClientSales(data?.id, isOpen);

  // Estado para el modal de detalles de la venta
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedSale, setSelectedSale] = useState(null);

  // Función para abrir el modal de detalles con la venta seleccionada
  const handleShowDetails = (sale) => {
    setSelectedSale(sale);
    setShowDetailsModal(true);
  };

  // Definir las columnas de la tabla de ventas del cliente
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const columns = useMemo(() => [
    { Header: "Código", accessor: "id" },
    { Header: "Fecha", accessor: "saleDate" },
    { Header: "Monto Total", accessor: "totalSale", Cell: ({ value }) => `$${value}` },
    { Header: "Estado", accessor: "status" },
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="d-flex gap-2 justify-content-center">
          <button 
            className="btn btn-info btn-sm"
            title="Ver Detalles"
            onClick={() => handleShowDetails(row.original)}
          >
            🔍
          </button>
        </div>
      ),
    },
  ], []);

  return (
    <>
      {/* Modal de Historial de Compras */}
      <Modal show={isOpen} onHide={onClose} centered size="lg">
        <Modal.Header closeButton className="bg-light border-bottom">
          <Modal.Title className="fw-bold">Historial de Compras - {data.name} {data.lastname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center"><Spinner animation="border" size="sm" /></div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : sales.length > 0 ? (
            <DataTable columns={columns} data={sales} />
          ) : (
            <p className="text-center">Este cliente no tiene compras registradas.</p>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Detalles de la Venta */}
      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        data={selectedSale}
      />
    </>
  );
};

export default SalesDetailsModal;

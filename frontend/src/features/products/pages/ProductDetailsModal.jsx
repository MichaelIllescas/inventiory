import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import useStockMovements from "../api/useStockMovements";
import { formatDate } from "../../../shared/helpers/formatDate";

const ProductDetailsModal = ({ isOpen, onClose, product, onOpenMovement }) => {
  const { movements, loading, error } = useStockMovements(product?.id, isOpen);
  if (!product) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p><strong>Código:</strong> {product.code}</p>
            <p><strong>Nombre:</strong> {product.name}</p>
            <p><strong>Marca:</strong> {product.brandName}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
            <p><strong>Precio de Venta:</strong> ${product.salePrice.toFixed(2)}</p>
          </Col>
          <Col md={6}>
            <p><strong>Stock:</strong> {parseFloat(product.stock)}</p>
            <p><strong>Stock Mínimo:</strong> {product.minStock}</p>
            <p><strong>Categoría:</strong> {product.category}</p>
            <p><strong>Fecha de Registro:</strong> {formatDate(product.registrationDate)}</p>
            <p><strong>Última Actualización:</strong> {product.updatedDate ? formatDate(product.updatedDate) : "Sin actualizar"}</p>
          </Col>
        </Row>
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Historial de stock</h5>
          <Button size="sm" variant="primary" onClick={onOpenMovement}>Registrar movimiento</Button>
        </div>
        {loading && <p>Cargando historial...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && movements.length === 0 && <p className="text-muted">Todavía no hay movimientos registrados.</p>}
        {!loading && movements.length > 0 && (
          <div className="table-responsive">
            <table className="table table-sm">
              <thead><tr><th>Fecha</th><th>Motivo</th><th>Cantidad</th><th>Nota</th></tr></thead>
              <tbody>{movements.map((movement) => <tr key={movement.id}><td>{formatDate(movement.movementDate)}</td><td>{movement.reason}</td><td>{movement.quantity}</td><td>{movement.note || "-"}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;

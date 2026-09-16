import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const PurchaseDetailsModal = ({ isOpen, onClose, purchase }) => {
  if (!purchase) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td><strong>Id compra:</strong></td>
              <td>{purchase.id}</td>
            </tr>
            <tr>
              <td><strong>Producto:</strong></td>
              <td>{purchase.productName}</td>
            </tr>
            <tr>
              <td><strong>Código de Producto:</strong></td>
              <td>{purchase.productCode}</td>
            </tr>
            <tr>
              <td><strong>Precio de Compra:</strong></td>
              <td>${purchase.purchasePrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td><strong>Cantidad:</strong></td>
              <td>{purchase.quantity}</td>
            </tr>
            <tr>
              <td><strong>Fecha de Compra:</strong></td>
              <td>{purchase.purchaseDate}</td>
            </tr>
            <tr>
              <td><strong>Proveedor:</strong></td>
              <td>{purchase.providerName}</td>
            </tr>
            <tr>
              <td><strong>Notas:</strong></td>
              <td>{purchase.notes || "Sin notas"}</td>
            </tr>
            <tr>
              <td><strong>Estado:</strong></td>
              <td>{purchase.state === "ACTIVO" ? "Activo" : "Anulado    "}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseDetailsModal;
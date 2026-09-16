import React from "react";
import { Modal, Button } from "react-bootstrap";

const DetailsModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Proveedor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Nombre:</strong> {data.name}</p>
        <p><strong>Nombre Comercial:</strong> {data.businessName}</p>
        <p><strong>CUIT/CUIL:</strong> {data.taxId}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Teléfono:</strong> {data.phone}</p>
        <p><strong>Dirección:</strong> {data.address}</p>
        <p><strong>Sitio Web:</strong> {data.website}</p>
        <p><strong>Persona de Contacto:</strong> {data.contactPerson}</p>
        <p><strong>Notas:</strong> {data.notes}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;

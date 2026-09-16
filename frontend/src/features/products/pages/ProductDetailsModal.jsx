import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
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
            <p><strong>Fecha de Registro:</strong> {product.registrationDate}</p>
            <p><strong>Última Actualización:</strong> {product.updatedDate ? product.updatedDate : "Sin actualizar"}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;

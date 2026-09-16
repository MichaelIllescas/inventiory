import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ isOpen, onClose, onConfirm, expense }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar el gasto{" "}
          <strong>{expense?.expenseType}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} className="fw-bold">
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} className="fw-bold">
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

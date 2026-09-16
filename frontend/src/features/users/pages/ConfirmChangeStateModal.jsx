import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmChangeStateModal = ({ isOpen, onClose, onConfirm, user }) => {
  if (!user) return null;

  // Determinar el nuevo estado
  const newState = user.state === "ACTIVO" ? "INACTIVO" : "ACTIVO";

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Cambio de Estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas cambiar el estado del usuario <strong>{user.firstName} {user.lastName}</strong>?
        </p>
        <p className="text-warning">
          Estado actual: <strong>{user.state}</strong> → <strong>{newState}</strong>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button 
          variant={newState === "ACTIVO" ? "success" : "warning"} 
          onClick={() => onConfirm(user.id, newState)}
        >
          {newState === "ACTIVO" ? "Activar" : "Desabilitar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmChangeStateModal;

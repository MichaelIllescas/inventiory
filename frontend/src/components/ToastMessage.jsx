import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const ToastMessage = ({ show, onClose, message, title, variant }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <ToastContainer
      position={isMobile ? "bottom-center" : "bottom-end"} // Responsivo
      className="p-3"
      style={{ maxWidth: isMobile ? "90vw" : "400px" }} // Ancho ajustado en móviles
    >
      <Toast show={show} onClose={onClose} delay={5000} autohide bg={variant}>
        <Toast.Header>
          <strong className="me-auto">👤 {title || "Notificación"}</strong>
          <small>Ahora</small>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;

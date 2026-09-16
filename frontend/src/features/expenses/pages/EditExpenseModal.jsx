import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ToastMessage from "../../../components/ToastMessage";

const EditExpenseModal = ({ isOpen, onClose, data, onSubmit }) => {
  const [formData, setFormData] = useState({
    expenseType: "",
    amount: "",
    paymentMethod: "",
    description: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "Error",
    variant: "danger", // 🔹 Usa el mismo estilo de ToastMessage
  });

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.expenseType || !formData.amount || !formData.paymentMethod) {
      setToast({
        show: true,
        title: "Campos Obligatorios",
        message: "Todos los campos son obligatorios.",
        variant: "danger", // 🔹 Usa el color rojo que ya tenés en los toasts
      });
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Gasto</Form.Label>
                <Form.Select
                  name="expenseType"
                  value={formData.expenseType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un tipo de gasto</option>
                  <option value="PROVEEDORES">Proveedores</option>
                  <option value="EMPLEADOS">Empleados</option>
                  <option value="ALQUILER">Alquiler</option>
                  <option value="SERVICIOS">Servicios</option>
                  <option value="IMPUESTOS">Impuestos</option>
                  <option value="OTROS">Otros</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Monto</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Método de Pago</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un método de pago</option>
                  <option value="EFECTIVO">Efectivo</option>
                  <option value="TARJETA">Tarjeta</option>
                  <option value="TRANSFERENCIA">Transferencia</option>
                  <option value="QR">QR</option>
                  <option value="OTROS">Otros</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Guardar Cambios
                </Button>
              </Modal.Footer>
            </Form>
          ) : (
            <p className="text-danger">No hay datos disponibles para editar.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* 🔹 Toast con los mismos estilos de `ToastMessage.js` */}
      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant} // 🔹 Usa los colores y estilos que ya tenés
      />
    </>
  );
};

export default EditExpenseModal;

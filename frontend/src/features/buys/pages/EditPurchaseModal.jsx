import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import useProviders from "../../providers/api/useProviders";
const EditPurchaseModal = ({ isOpen, onClose, purchaseData, onSubmit }) => {
  const { providers, fetchProviders } = useProviders();
  
  const [formData, setFormData] = useState({
    purchasePrice: "",
    quantity: "",
    purchaseDate: "",
    notes: "",
    providerId: ""
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    if (purchaseData) {
      // Convertir la fecha de "dd/MM/yyyy" a "yyyy-MM-dd"
      const formattedDate = purchaseData.purchaseDate
        ? purchaseData.purchaseDate.split("/").reverse().join("-")
        : "";
      
      // Obtener el ID del proveedor a partir del nombre
      const provider = providers.find((p) => p.name === purchaseData.providerName);
      
      setFormData({
        purchasePrice: purchaseData.purchasePrice || "",
        quantity: purchaseData.quantity || "",
        purchaseDate: formattedDate,
        notes: purchaseData.notes || "",
        providerId: provider ? String(provider.id) : ""
      });
    }
  }, [purchaseData, providers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...purchaseData, ...formData });
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Proveedor</Form.Label>
            <Form.Select
              name="providerId"
              value={formData.providerId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un proveedor</option>
              {providers.map((provider) => (
                <option key={provider.id} value={String(provider.id)}>
                  {provider.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio de Compra</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Compra</Form.Label>
            <Form.Control
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notas</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPurchaseModal;
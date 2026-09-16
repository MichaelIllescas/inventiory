import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useProvidersActives from "../../providers/api/useProvidersActives";
import useRegisterStockMovement from "../api/useRegisterStockMovement";

const initialForm = {
  quantity: "",
  movementDate: new Date().toISOString().slice(0, 10),
  reason: "INGRESO",
  providerId: "",
  note: "",
};

const StockMovementModal = ({ show, product, onClose, onRegistered }) => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);
  const { providers, loading: providersLoading } = useProvidersActives();
  const { registerStockMovement, loading, error } = useRegisterStockMovement();

  useEffect(() => {
    if (show) {
      setForm(initialForm);
      setMessage(null);
    }
  }, [show, product]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage(null);
    try {
      const result = await registerStockMovement(product.id, {
        ...form,
        quantity: Number(form.quantity),
        providerId: form.providerId ? Number(form.providerId) : null,
      });
      setMessage(`Movimiento registrado. Stock actual: ${result.currentStock}`);
      onRegistered(result);
    } catch {
      // El hook expone el mensaje para el estado de error del formulario.
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3"><strong>{product?.name}</strong></p>
          <Form.Group className="mb-3">
            <Form.Label>Motivo</Form.Label>
            <Form.Select name="reason" value={form.reason} onChange={updateField}>
              <option value="INGRESO">Ingreso</option>
              <option value="AJUSTE">Ajuste</option>
              <option value="PERDIDA">Pérdida</option>
              <option value="DEVOLUCION">Devolución</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control name="quantity" type="number" step="0.01" required min={form.reason === "AJUSTE" ? undefined : "0.01"} value={form.quantity} onChange={updateField} />
            {form.reason === "AJUSTE" && <Form.Text>Usá una cantidad negativa para reducir el stock.</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control name="movementDate" type="date" required value={form.movementDate} onChange={updateField} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Proveedor (opcional)</Form.Label>
            <Form.Select name="providerId" value={form.providerId} onChange={updateField} disabled={providersLoading}>
              <option value="">Sin proveedor</option>
              {providers.map((provider) => <option key={provider.id} value={provider.id}>{provider.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nota (opcional)</Form.Label>
            <Form.Control name="note" as="textarea" maxLength={500} value={form.note} onChange={updateField} />
          </Form.Group>
          {error && <div className="text-danger mt-3">{error}</div>}
          {message && <div className="text-success mt-3">{message}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
          <Button type="submit" variant="primary" disabled={loading}>{loading ? "Registrando..." : "Registrar movimiento"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StockMovementModal;

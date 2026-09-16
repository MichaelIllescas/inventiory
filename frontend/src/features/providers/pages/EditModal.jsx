import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditModal = ({ isOpen, onClose, data, onSubmit }) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg"> {/* ✅ Modal más amplio */}
      <Modal.Header closeButton>
        <Modal.Title>Editar Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3"> {/* ✅ Espaciado entre filas */}
            {/* Primera columna */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Nombre Comercial</Form.Label>
                <Form.Control
                  type="text"
                  name="businessName"
                  value={formData.businessName || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>CUIT/CUIL</Form.Label>
                <Form.Control
                  type="text"
                  name="taxId"
                  value={formData.taxId || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Segunda columna */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Sitio Web</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Persona de Contacto</Form.Label>
                <Form.Control
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Notas</Form.Label>
                <Form.Control
                  as="textarea"
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;

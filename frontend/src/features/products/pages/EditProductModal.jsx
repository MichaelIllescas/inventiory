import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import useProviders from "../../providers/api/useProviders";

const EditProductModal = ({ isOpen, onClose, productData, onSubmit }) => {
  const { providers } = useProviders();

  const [formData, setFormData] = useState({
    id: "",
    code: "",
    name: "",
    description: "",
    salePrice: "",
    minStock: "",
    category: "",
    providerId: "", // Opcional
    brandName: "",
  });

  useEffect(() => {
    if (productData && isOpen) {
      setFormData({
        id: productData.id || "", // 🔹 Mantiene el ID para la edición
        code: productData.code || "",
        name: productData.name || "",
        description: productData.description || "",
        salePrice: productData.salePrice ? parseFloat(productData.salePrice) : "",
        minStock: productData.minStock || "",
        category: productData.category || "",
        providerId: productData.providerId ? String(productData.providerId) : "",
        brandName: productData.brandName || "",
      });
    }
  }, [productData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones antes de enviar la petición
    if (!formData.code || formData.code.length > 50) {
      alert("El código del producto es obligatorio y no debe superar los 50 caracteres.");
      return;
    }
    if (!formData.name || formData.name.length > 100) {
      alert("El nombre del producto es obligatorio y no debe superar los 100 caracteres.");
      return;
    }
    if (formData.description && formData.description.length > 255) {
      alert("La descripción no puede superar los 255 caracteres.");
      return;
    }
    if (!formData.salePrice || parseFloat(formData.salePrice) <= 0.01) {
      alert("El precio de venta es obligatorio y debe ser mayor a 0.01.");
      return;
    }
    if (formData.minStock && parseInt(formData.minStock) < 0) {
      alert("El stock mínimo no puede ser negativo.");
      return;
    }
    if (!formData.category || formData.category.length > 100) {
      alert("La categoría es obligatoria y no debe superar los 100 caracteres.");
      return;
    }
    if (formData.brandName && formData.brandName.length > 100) {
      alert("El nombre de la marca no puede superar los 100 caracteres.");
      return;
    }

    onSubmit({
      ...formData,
      salePrice: parseFloat(formData.salePrice),
      minStock: formData.minStock ? parseInt(formData.minStock) : 0,
      providerId: formData.providerId ? Number(formData.providerId) : null, // Opcional
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {/* Primera columna */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>ID (No editable)</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={formData.id}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  maxLength={50}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={255}
                />
              </Form.Group>

            
            </Col>

            {/* Segunda columna */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Stock mínimo</Form.Label>
                <Form.Control
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleChange}
                  min="0"
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  maxLength={100}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  maxLength={100}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Precio de Venta</Form.Label>
                <Form.Control
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0.01"
                />
              </Form.Group>

            
            </Col>
          </Row>

          <div className="text-center mt-4 mx-3">
            <Button className="mx-2" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="mx-2" variant="primary" type="submit">
              Guardar 
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;

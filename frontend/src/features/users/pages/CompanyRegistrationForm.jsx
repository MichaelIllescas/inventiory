import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import useCreateCompany from "../api/useCreateCompany";
import ToastMessage from "../../../components/ToastMessage";

const CompanyRegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    businessAddress: "",
    taxIdentificationNumber: "",
    phone: "",
    email: "",
  });

  const { createCompany, loading } = useCreateCompany();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdCompany = await createCompany(formData);

      // Limpia campos
      setFormData({
        name: "",
        businessAddress: "",
        taxIdentificationNumber: "",
        phone: "",
        email: "",
      });

      // Notifica éxito
      setToast({
        show: true,
        title: "Éxito",
        message: "Empresa registrada correctamente",
        variant: "success",
      });

      // Llama a onSuccess para que el padre muestre los datos
      if (onSuccess) onSuccess(createdCompany);
    } catch (err) {
      setToast({
        show: true,
        title: "Error",
        message: err.response?.data?.error || "Error al registrar la empresa",
        variant: "danger",
      });
    }
  };

  return (
    <Card className="p-4 shadow-sm mt-4">
      <h5 className="mb-3">Registrar Empresa</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="businessAddress" className="mb-3">
          <Form.Label>Dirección Comercial</Form.Label>
          <Form.Control
            type="text"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="taxIdentificationNumber" className="mb-3">
          <Form.Label>CUIT</Form.Label>
          <Form.Control
            type="text"
            name="taxIdentificationNumber"
            value={formData.taxIdentificationNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone" className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar Empresa"}
        </Button>
      </Form>

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant}
      />
    </Card>
  );
};

export default CompanyRegistrationForm;

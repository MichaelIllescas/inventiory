import React, { useState } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TermsPage from "./TermsPage";
import PrivacyPage from "./PrivacyPage";
import { useNavigate } from "react-router-dom";
import { useRegisterFromLandingPage } from "../api/useRegisterFromLandingPage.js";

const RegisterProPlan = () => {
  const { registerUserPro, loading, error, setError } = useRegisterFromLandingPage();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    documentNumber: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "El nombre es obligatorio";
    if (!form.lastName.trim()) errors.lastName = "El apellido es obligatorio";
    if (!/^\d+$/.test(form.documentNumber)) errors.documentNumber = "Debe ser un número válido";
    if (!/^\d+$/.test(form.phone)) errors.phone = "Debe ser un número válido";
    if (!form.address.trim()) errors.address = "La dirección es obligatoria";
    if (!form.email.trim()) {
      errors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Formato de email inválido";
    }
    if (!form.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      errors.password = "Debe tener al menos 6 caracteres";
    }
    if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!form.acceptTerms) {
      errors.acceptTerms = "Debes aceptar los términos";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const result = await registerUserPro(form);
      if (result) {
        setConfirm(true);
        setForm({
          name: "",
          lastName: "",
          documentNumber: "",
          phone: "",
          address: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
        if (setError) setError(null);

        let counter = 5;
        const interval = setInterval(() => {
          setRedirectCountdown((prev) => prev - 1);
          counter--;
          if (counter === 0) {
            clearInterval(interval);
            navigate("/login");
          }
        }, 1000);
      }
    }
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Registro Plan PRO</h1>

      <div className="d-flex flex-column justify-content-center w-75 m-auto">
        <p className="text-start text-grey mb-3 ms-5">
          ✅ Tendrás acceso <strong>ilimitado</strong> a todas las funcionalidades del sistema.
        </p>
        <p className="text-start text-grey mb-4 ms-5">
          ✅ Nuestro equipo de <strong>Imperialnet</strong> se pondrá en contacto contigo para coordinar los0 método de pagos y el acompañamiento durante su comienzo con Inventiory.
        </p>
      </div>

      <Form onSubmit={handleSubmit} noValidate className="shadow p-4 rounded">
        <Row>
          <Col md={6} className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              isInvalid={!!formErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.name}
            </Form.Control.Feedback>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              isInvalid={!!formErrors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.lastName}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Label>Número de documento</Form.Label>
            <Form.Control
              type="text"
              name="documentNumber"
              value={form.documentNumber}
              onChange={handleChange}
              isInvalid={!!formErrors.documentNumber}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.documentNumber}
            </Form.Control.Feedback>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              isInvalid={!!formErrors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.phone}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              isInvalid={!!formErrors.address}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.address}
            </Form.Control.Feedback>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!formErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Col>

          <Col md={6} className="mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              isInvalid={!!formErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="acceptTerms"
            checked={form.acceptTerms}
            onChange={handleChange}
            label={
              <span>
                Acepto los{" "}
                <span
                  role="button"
                  className="text-primary text-decoration-underline"
                  onClick={() => setShowModal(true)}
                >
                  Términos y Condiciones y la Política de Privacidad
                </span>
              </span>
            }
            isInvalid={!!formErrors.acceptTerms}
            feedback={formErrors.acceptTerms}
          />
        </Form.Group>

        <div className="w-100 mt-5 text-center">
          <Button variant="primary" type="submit" className="w-auto" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse con Plan PRO"}
          </Button>
        </div>

        {confirm && (
          <div className="alert alert-success text-center mt-3">
            ✅ ¡Registro enviado con éxito! Serás redirigido al login en {redirectCountdown} segundos...
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center mt-3">
            ❌ {error}
          </div>
        )}
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Términos y Condiciones / Política de Privacidad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TermsPage />
          <hr />
          <PrivacyPage />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegisterProPlan;

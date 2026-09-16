import React from 'react';
import { Container } from 'react-bootstrap';

const TermsPage = () => {
  return (
    <section className="">
      <Container>
        <h4 className="  mb-3">Términos y Condiciones</h4>
        <hr />
        <p><strong>Fecha de entrada en vigencia:</strong> 2 de abril de 2025</p>
        <p>
          Bienvenido a Inventiory. Al acceder o utilizar nuestra plataforma, aceptás los siguientes términos y condiciones.
          Si no estás de acuerdo, por favor no utilices el servicio.
        </p>
        <ul>
          <li><strong>Uso del servicio:</strong> Inventiory está diseñado para facilitar la gestión de productos, proveedores, clientes, ventas y facturación en diversas empresas.</li>
          <li><strong>Registro:</strong> Para acceder a funcionalidades completas, el usuario debe registrarse proporcionando información veraz y actualizada.</li>
          <li><strong>Responsabilidad del usuario:</strong> El usuario es responsable del uso que haga del sistema y de la protección de sus credenciales de acceso.</li>
          <li><strong>Suspensión o cancelación:</strong> Nos reservamos el derecho de suspender o cancelar cuentas que violen estos términos o hagan un uso indebido del sistema.</li>
          <li><strong>Modificaciones:</strong> Podemos actualizar estos términos en cualquier momento. Se notificará a los usuarios cuando esto ocurra.</li>
        </ul>
        <p>Para consultas legales, escribinos a <strong>info@imperial-net.com</strong>.</p>
      </Container>
    </section>
  );
};

export default TermsPage;

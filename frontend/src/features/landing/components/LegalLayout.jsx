import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from "../../../layout/Footer";
import logo from '../../../assets/img/logo.png';
import '../../../styles/legal.css';

/**
 * Envoltorio de las páginas legales públicas (términos y privacidad).
 *
 * No usa la navegación de la landing a propósito: sus enlaces apuntan a
 * secciones de la página de inicio (#beneficios, #planes) que acá no existen.
 * En su lugar muestra una barra mínima con la marca y una salida al inicio.
 */
const LegalLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

  return (
    <>
      <header className="legal-topbar">
        <div className="legal-topbar__inner">
          <Link to="/" className="legal-topbar__brand">
            <img src={logo} alt="Inventiory" />
            <span>Inventiory</span>
          </Link>
          <Link to="/" className="legal-topbar__back">
            <ArrowLeft size={15} aria-hidden="true" /> Volver al inicio
          </Link>
        </div>
      </header>

      <main className="legal-page">
        <article className="legal-doc">
          {children}
        </article>
      </main>

      <Footer />
    </>
  );
};

export default LegalLayout;

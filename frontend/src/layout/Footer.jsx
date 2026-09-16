import "../styles/footer.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { Mail, Globe, ShieldCheck, FileText } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container app-footer__inner">
        <div className="app-footer__grid">
          {/* Marca */}
          <div className="app-footer__brand">
            <div className="app-footer__brand-head">
              <img src={logo} alt="Logo Inventiory" width="42" height="38" />
              <span className="app-footer__brand-name">Inventiory</span>
            </div>
            <p className="app-footer__tagline">
              Gestión de stock, compras y ventas para PyMEs.
            </p>
          </div>

          {/* Legales */}
          <nav className="app-footer__col" aria-label="Enlaces legales">
            <h3 className="app-footer__title">Legales</h3>
            <ul className="app-footer__list">
              <li>
                <Link to="/terminos" className="app-footer__link">
                  <FileText size={16} aria-hidden="true" />
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="app-footer__link">
                  <ShieldCheck size={16} aria-hidden="true" />
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacto */}
          <div className="app-footer__col">
            <h3 className="app-footer__title">Contacto</h3>
            <ul className="app-footer__list">
              <li>
                <a href="mailto:info@imperial-net.com" className="app-footer__link">
                  <Mail size={16} aria-hidden="true" />
                  info@imperial-net.com
                </a>
              </li>
              <li>
                <a
                  href="https://imperial-net.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-footer__link"
                >
                  <Globe size={16} aria-hidden="true" />
                  imperial-net.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="app-footer__bottom">
          <small>&copy; {year} Inventiory. Todos los derechos reservados.</small>
          <small>
            Desarrollado por{" "}
            <a
              href="https://imperial-net.com"
              target="_blank"
              rel="noopener noreferrer"
              className="app-footer__link app-footer__link--inline"
            >
              Imperial-Net
            </a>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

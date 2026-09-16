import '../styles/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="w-100 mt-1 text-white p-2 text-center">
        <p className="mx-2">
          &copy; 2025 Inventiory <br />
          Desarrollado por Imperial-Net <span className="mx-2">|</span>
          <span>info@imperial-net.com</span>
        </p>
        <p className="mx-2 mb-3">
          <Link to="/legalTerms" className="text-white text-decoration-none mx-2">
            Términos y condiciones
          </Link>
          |
          <Link to="/legalTerms" className="text-white text-decoration-none mx-2">
            Política de privacidad
          </Link>
        </p>
      </footer>
    </>
  );
};

export default Footer;

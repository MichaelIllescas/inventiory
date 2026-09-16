import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "/src/assets/img/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../../layout/Footer";
import '../../../styles/LoginPage.css';

export const LoginPage = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    if (user) {
      navigate("/dashboard", { replace: true });
    }

    // Recuperar el email si está en localStorage
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setErrorMessage("");

    try {
      const user = await loginUser(email, password);
      if (user) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        navigate("/dashboard", { replace: true });
      } else {
        setError(true);
        setErrorMessage("Error en la autenticación.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(true);
        setErrorMessage(err.response.data.error);
      } else {
        setError(true);
        setErrorMessage("Error al intentar iniciar sesión.");
      }
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center" data-aos="flip-up">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center py-0 m-0">
                  <img src={logo} alt="Logo" width="200" className="rotate-vertical-center" />
                </div>
                <hr />
                <div className="pt-0 pb-2 text-center">
                  <h5 className="card-title fs-1">Iniciar sesión</h5>
                </div>

                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className={`form-control ${error ? "is-invalid" : ""}`}
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${error ? "is-invalid" : ""}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Recuérdame
                      </label>
                    </div>
                  </div>

                  {error && <p className="text-danger text-center">{errorMessage}</p>}

                  <div className="col-12">
                    <button className="btn btn-primary btn-login w-100" type="submit">
                      Ingresar
                    </button>
                  </div>

                  <div className="col-12 text-center">
                    <p className="small mb-0">
                    ¿Olvidaste tu contraseña?
                    <Link to={'/forgotPassword'}>
                    
                    Recuperar acceso
                    </Link> 
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
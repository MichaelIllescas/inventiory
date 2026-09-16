import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../src/config/axiosConfig";
import Footer from "../layout/Footer";
import { LoadingScreen } from "./LoadingScreen";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      await apiClient.post("/auth/forgot-password", { email });
      setMensaje(
        "✔️ Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.\nSerás redirigido al inicio de sesión en unos segundos..."
      );
      setEnviado(true);
      setEmail("");
    } catch (error) {
      setMensaje("Hubo un error al procesar tu solicitud. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enviado) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [enviado, navigate]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="container mt-5 card p-4 fade-in" style={{ maxWidth: "500px" }}>
          <h3 className="mb-3">Recuperar contraseña</h3>

          {mensaje && (
            <div
              className={`alert ${enviado ? "alert-success" : "alert-info"}`}
              style={{ whiteSpace: "pre-line", fontSize: "1rem" }}
            >
              {enviado && (
                <div className="text-center mb-2">
                  <span style={{ fontSize: "3rem", color: "green" }}>✔️</span>
                </div>
              )}
              {mensaje}
            </div>
          )}

          {!enviado && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar enlace"}
              </button>
            </form>
          )}

          {enviado && (
            <button
              className="btn btn-secondary mt-3 w-100"
              onClick={() => navigate("/login")}
            >
              Ir al inicio de sesión
            </button>
          )}
        </div>
      </div>

      <Footer />


    </div>
  );
};

export default ForgotPassword;

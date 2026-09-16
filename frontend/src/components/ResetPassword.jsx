import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import apiClient from "../../src/config/axiosConfig";
import Footer from "../layout/Footer";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      await apiClient.post("/auth/reset-password", {
        token,
        newPassword: password,
      });
      setMensaje(
        "✔️ Tu contraseña fue restablecida con éxito.\nSerás redirigido al inicio de sesión en unos segundos..."
      );
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMensaje("El enlace es inválido o ha expirado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="container mt-5 card p-4 fade-in" style={{ maxWidth: "500px" }}>
          <h3 className="mb-3">Establecer nueva contraseña</h3>

          {mensaje && (
            <div
              className={`alert ${success ? "alert-success" : "alert-danger"}`}
              style={{ whiteSpace: "pre-line", fontSize: "1rem" }}
            >
              {success && (
                <div className="text-center mb-2">
                  <span style={{ fontSize: "3rem", color: "green" }}>✔️</span>
                </div>
              )}
              {mensaje}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nueva contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Restablecer contraseña"}
              </button>
            </form>
          )}

          {success && (
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

export default ResetPassword;

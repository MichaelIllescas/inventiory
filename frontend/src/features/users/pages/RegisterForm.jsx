import React, { useState } from "react";
import { useRegisterUser } from "../api/useRegisterUser";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { AlertTriangle, CheckCircle,Users  } from "lucide-react";

const RegisterForm = () => {
  const { registerUser, loading, error, setError } = useRegisterUser();   
  const [confirm, setConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentNumber: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    role: "",
    subscription:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await registerUser(formData);
    if (result) {
      setConfirm(true);
      setFormData({
        firstName: "",
        lastName: "",
        documentNumber: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        role: "",
        subscription: ""
      });

      if (setError) setError(null);

      setTimeout(() => {
        setConfirm(false);
      }, 7000);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="mt-5 pt-3 d-flex align-items-center justify-content-center flex-column" data-aos="fade-left">
      <div className="col-sm-12 col-md-8 col-lg-8 card pt-4 pb-3">
      
        <h2 className="text-center pt-2"><Users size={24} className="me-2" />Registrar Usuario</h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">Nombre:</label>
              <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="form-control" placeholder="Ej: Juan" />

              <label htmlFor="documentNumber" className="form-label mt-3">D.N.I.:</label>
              <input type="text" name="documentNumber" id="documentNumber" value={formData.documentNumber} onChange={handleChange} required className="form-control" placeholder="Ej: 40123456" />

              <label htmlFor="address" className="form-label mt-3">Dirección:</label>
              <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="form-control" placeholder="Ej: Av. Siempre Viva 742" />

              <label htmlFor="password" className="form-label mt-3">Clave:</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className="form-control" placeholder="Ingresa una contraseña segura" />
            </div>

            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">Apellido:</label>
              <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="form-control" placeholder="Ej: Pérez" />

              <label htmlFor="phone" className="form-label mt-3">Teléfono:</label>
              <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="form-control" placeholder="Ej: +54 9 11 2345-6789" />

              <label htmlFor="email" className="form-label mt-3">Email:</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="form-control" placeholder="Ej: usuario@email.com" />

              <label htmlFor="role" className="form-label mt-3">Rol:</label>
              <select name="role" id="role" value={formData.role} onChange={handleChange} required className="form-select form-control">
                <option disabled value="">Selecciona un rol</option>
                <option value="ADMIN">Administrador</option>
                <option value="USER">Usuario</option>
              </select>

          </div>
          <div className="col-lg-6 col-sm-12">
            
              <label htmlFor="subscription" className="form-label mt-3">Sucripcion:</label>
              <select name="subscription" id="subscription" value={formData.subscription} onChange={handleChange} required className="form-select form-control">
                <option disabled value="">Selecciona el tipo de Suscripcion</option>
                <option value="FREE">FREE</option>
                <option value="PRO">PRO</option>
              </select>
          </div>
            </div>

          <div className="text-center mt-4 pt-3">
            <button type="submit" className="btn btn-confirm">Registrar</button>
          </div>
        </form>

        {error && <div className="alert alert-danger mt-1 text-center mx-2" role="alert"><AlertTriangle/><span className="m-2">{error}</span></div>}
        {confirm && <div className="alert alert-success mt-0 text-center mx-2" role="alert"> <CheckCircle/> <span>¡Usuario registrado exitosamente!</span></div>}
      </div>
    </div>
  );
};

export default RegisterForm;

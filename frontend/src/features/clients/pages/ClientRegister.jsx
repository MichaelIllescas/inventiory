import React, { useState } from "react";
import { useRegisterClient } from "../api/useRegisterClient";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { AlertTriangle, CheckCircle, UserPlus } from "lucide-react";

const ClientRegister = () => {
  const { registrationClient, loading, error } = useRegisterClient();
  const [confirm, setConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    documentNumber: "",
    laxId: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await registrationClient(formData);
    if (result) {
      setConfirm(true);
      setFormData({
        name: "",
        lastname: "",
        documentNumber: "",
        laxId: "",
        phone: "",
        email: "",
        address: "",
      });

      setTimeout(() => {
        setConfirm(false);
      }, 7000);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="mt-5 pt-3 d-flex align-items-center justify-content-center flex-column" data-aos="fade-left">
      <div className="col-sm-12 col-md-8 col-lg-8 card pt-4 pb-3">
        <h2 className="text-center pt-2">
          <UserPlus size={24} className="me-2" />
          Registrar Cliente
        </h2>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="row">
            {/* Primera columna */}
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Nombre:</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="Ej.: Juan" />

              <label htmlFor="lastname" className="form-label mt-3">Apellido:</label>
              <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} required className="form-control" placeholder="Ej.: Pérez" />

              <label htmlFor="documentNumber" className="form-label mt-3">Número de Documento:</label>
              <input type="text" name="documentNumber" id="documentNumber" value={formData.documentNumber} onChange={handleChange} required className="form-control" placeholder="Ej.: 12345678" />
            </div>

            {/* Segunda columna */}
            <div className="col-md-6">
              <label htmlFor="laxId" className="form-label">Cuit/Cuil</label>
              <input type="text" name="laxId" id="laxId" value={formData.laxId} onChange={handleChange}  className="form-control" placeholder="Ej.: 987654" />

              <label htmlFor="phone" className="form-label mt-3">Teléfono:</label>
              <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="form-control" placeholder="Ej.: 011-1234567" />

              <label htmlFor="email" className="form-label mt-3">Email:</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="form-control" placeholder="Ej.: cliente@example.com" />
            </div>
          </div>

          {/* Dirección y Botón */}
          <div className="mt-3">
            <label htmlFor="address" className="form-label">Dirección:</label>
            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="form-control" placeholder="Ej.: Calle Falsa 123" />
          </div>

          <div className="text-center mt-4 pt-3">
            <button type="submit" className="btn btn-confirm">Registrar</button>
          </div>
        </form>

        {error && <div className="alert alert-danger mt-1 text-center mx-2" role="alert"><AlertTriangle/><span className=" m-2 ">{error}</span></div>}
        {confirm && <div className="alert alert-success mt-0 text-center mx-2" role="alert"> <CheckCircle/> <span>¡Cliente registrado exitosamente!</span></div>}
      </div>
    </div>
  );
};

export default ClientRegister;

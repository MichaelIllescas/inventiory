import React, { useState } from "react";
import { useRegisterProvider } from "../api/useRegisterProvider";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { AlertTriangle, CheckCircle, Truck } from "lucide-react";

const ProviderRegister = () => {
  const { registrationProvider, loading, error, setError } = useRegisterProvider();
  const [confirm, setConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    taxId: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    contactPerson: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await registrationProvider(formData);
    if (result) {
      setConfirm(true);
      setFormData({
        name: "",
        businessName: "",
        taxId: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        contactPerson: "",
        notes: "",
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
        <h2 className="text-center pt-2">
          <Truck size={24} className="me-2" />
          Registrar Proveedor
        </h2>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="row">
            {/* Primera columna */}
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Nombre: </label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="Ej.: Imperial-net Solutions S.A " />

              <label htmlFor="taxId" className="form-label mt-3">CUIT/CUIL:</label>
              <input type="text" name="taxId" id="taxId" value={formData.taxId} onChange={handleChange} required className="form-control" placeholder="Ej.: 20-37757084-8"/>

              <label htmlFor="address" className="form-label mt-3">Dirección:</label>
              <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="form-control" placeholder="Ej.: Dorrego Nro. 123, CABA" />

              <label htmlFor="website" className="form-label mt-3">Sitio Web:</label>
              <input type="text" name="website" id="website" value={formData.website} onChange={handleChange} className="form-control" placeholder="Ej.: www.imperial-net.com"/>
            </div>

            {/* Segunda columna */}
            <div className="col-md-6">
              <label htmlFor="businessName" className="form-label">Nombre Comercial:</label>
              <input type="text" name="businessName" id="businessName" value={formData.businessName} onChange={handleChange} required className="form-control" placeholder="Ej.: Imperial-net" />

              <label htmlFor="phone" className="form-label mt-3">Teléfono:</label>
              <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="form-control" placeholder="Ej.: 011-1122554" />

              <label htmlFor="email" className="form-label mt-3">Email:</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="form-control" placeholder="Ej.: info@Imperial-net.com"/>

              <label htmlFor="contactPerson" className="form-label mt-3">Persona de Contacto:</label>
              <input type="text" name="contactPerson" id="contactPerson" value={formData.contactPerson} onChange={handleChange} className="form-control" placeholder="Persona de referencia dentro de la empresa."/>
            </div>
          </div>

          {/* Notas y Botón */}
          <div className="mt-3">
            <label htmlFor="notes" className="form-label">Notas:</label>
            <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} className="form-control" placeholder="Observaciones.."></textarea>
          </div>

          <div className="text-center mt-4 pt-3">
            <button type="submit" className="btn btn-confirm">Registrar</button>
          </div>
        </form>

        {error && <div className="alert alert-danger mt-1 text-center mx-2" role="alert"><AlertTriangle/><span className=" m-2 ">{error}</span></div>}
        {confirm && <div className="alert alert-success mt-0 text-center mx-2" role="alert"> <CheckCircle/> <span>¡Proveedor registrado exitosamente!</span></div>}
      </div>
    </div>
  );
};

export default ProviderRegister;

import { useState } from "react";
import { useRegisterProduct } from "../api/useRegisterProduct";
import { AlertTriangle, CheckCircle, Package } from "lucide-react";
import { LoadingScreen } from "../../../components/LoadingScreen";

const ProductRegister = () => {
  const { registrationProduct, loading, error, setError } = useRegisterProduct();
  const [confirm, setConfirm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    salePrice: "",
    minStock: "",
    initialStock: "0",
    category: "",
    brandName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registrationProduct(formData);
    if (result) {
      setConfirm(true);
      setFormData({
        code: "",
        name: "",
        description: "",
        salePrice: "",
        minStock: "",
        initialStock: "0",
        category: "",
        brandName: "",
      });

      if (setError) setError(null);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="mt-5 pt-3 d-flex align-items-center justify-content-center flex-column" data-aos="fade-left">
      <div className="container mt-2 pt-3 pb-3 card col-sm-12 col-md-8 col-lg-8">
        <h2 className="text-center pt-2">
          <Package size={24} className="me-2" />
          Registrar Producto
        </h2>
        <p className="required-fields-note text-center mb-2">
          Los campos marcados con <span className="required-mark">*</span> son obligatorios.
        </p>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="row g-3">
            <div className="col-md-6" data-aos="fade-right">
              <label htmlFor="code" className="form-label">Código del Producto:</label>
              <input type="text" name="code" value={formData.code} onChange={handleChange} className="form-control" placeholder="Opcional. Ej.: P12345" />
            </div>

            <div className="col-md-6" data-aos="fade-left">
              <label htmlFor="name" className="form-label">Nombre: <span className="required-mark">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="Ej.: Camiseta Deportiva" />
            </div>

            <div className="col-md-6" data-aos="fade-right">
              <label htmlFor="brandName" className="form-label mt-3">Marca: <span className="required-mark">*</span></label>
              <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} required className="form-control" placeholder="Ej.: Nike" />
            </div>

            <div className="col-md-6" data-aos="fade-left">
              <label htmlFor="category" className="form-label mt-3">Categoría: <span className="required-mark">*</span></label>
              <select name="category" value={formData.category} onChange={handleChange} required className="form-control form-select">
                <option value="" disabled>Seleccione una categoría</option>
                <option value="Indumentaria">Indumentaria</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Hogar y Cocina">Hogar y Cocina</option>
                <option value="Alimentos y Bebidas">Alimentos y Bebidas</option>
                <option value="Limpieza">Limpieza</option>
                <option value="Salud y Belleza">Salud y Belleza</option>
                <option value="Ferretería">Ferretería</option>
                <option value="Librería y Oficina">Librería y Oficina</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Deportes">Deportes</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Mascotas">Mascotas</option>
                <option value="Automotor">Automotor</option>
                <option value="Construcción">Construcción</option>
                <option value="Jardinería">Jardinería</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            <div className="col-12" data-aos="fade-up">
              <label htmlFor="description" className="form-label mt-3">Descripción:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Ej.: Camiseta de algodón"></textarea>
            </div>

            <div className="col-md-6" data-aos="fade-right">
              <label htmlFor="salePrice" className="form-label">Precio de Venta: <span className="required-mark">*</span></label>
              <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} required className="form-control" step="0.01" placeholder="Ej.: 29.99" />
            </div>

            <div className="col-md-6" data-aos="fade-right">
              <label htmlFor="initialStock" className="form-label">Stock Inicial: <span className="required-mark">*</span></label>
              <input type="number" name="initialStock" value={formData.initialStock} onChange={handleChange} required className="form-control" min="0" step="0.01" placeholder="Ej.: 10" />
            </div>

            <div className="col-md-6" data-aos="fade-left">
              <label htmlFor="minStock" className="form-label">Stock Mínimo:</label>
              <input type="number" name="minStock" value={formData.minStock} onChange={handleChange} className="form-control" min="0" placeholder="Ej.: 10" />
            </div>
          </div>

          <div className="text-center mt-4 pt-1" >
            <button type="submit" className="btn btn-confirm">Registrar</button>
          </div>
        </form>

        {confirm && (
          <div className="alert alert-success mt-0 text-center mx-2" role="alert">
            <CheckCircle /> <span>¡Producto registrado exitosamente!</span>
          </div>
        )}

{error && <div className="alert alert-danger mt-1 text-center mx-2" role="alert"><AlertTriangle/><span className="m-2">{error}</span></div>}

        
      </div>
    </div>
  );
};

export default ProductRegister;

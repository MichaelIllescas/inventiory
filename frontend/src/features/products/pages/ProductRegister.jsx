import { useState } from "react";
import { useRegisterProduct } from "../api/useRegisterProduct";
import { AlertTriangle, CheckCircle, Package } from "lucide-react";
import { LoadingScreen } from "../../../components/LoadingScreen";

const ProductRegister = ({ setActiveTab, setPreselectedProduct }) => {
  const { registrationProduct, loading, error, setError } = useRegisterProduct();
  const [confirm, setConfirm] = useState(false);
  const [newProductId, setNewProductId] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    salePrice: "",
    minStock: "",
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
      setNewProductId(result.id);
      setFormData({
        code: "",
        name: "",
        description: "",
        salePrice: "",
        minStock: "",
        category: "",
        brandName: "",
      });

      if (setError) setError(null);
      setTimeout(() => setConfirm(false), 5000);
    }
  };

  const handleRegisterPurchase = () => {
    if (newProductId) {
      console.log("Cambiando a tab: register-purchase con producto ID:", newProductId);

      if (typeof setPreselectedProduct === "function") {
        setPreselectedProduct(newProductId);
      } else {
        console.error("setPreselectedProduct no está definido o no es una función.");
      }

      if (typeof setActiveTab === "function") {
        setActiveTab("register-purchase");
      } else {
        console.error("setActiveTab no está definido o no es una función.");
      }
    } else {
      console.error("No se encontró un ID de producto válido para registrar compra.");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="mt-2 d-flex align-items-center justify-content-center flex-column" data-aos="fade-left">
      <div className="container pb-3">
        <h2 className="text-center pt-2">
          <Package size={24} className="me-2" />
          Registrar Producto
        </h2>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="row">
            <div className="col-md-6" data-aos="fade-right">
              <label htmlFor="code" className="form-label">Código del Producto:</label>
              <input type="text" name="code" value={formData.code} onChange={handleChange} required className="form-control" placeholder="Ej.: P12345" />

              <label htmlFor="name" className="form-label mt-3">Nombre:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" placeholder="Ej.: Camiseta Deportiva" />

              <label htmlFor="description" className="form-label mt-3">Descripción:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Ej.: Camiseta de algodón"></textarea>

              <label htmlFor="category" className="form-label mt-3">Categoría:</label>
              <select name="category" value={formData.category} onChange={handleChange} required className="form-control form-select">
                <option value="" disabled>Seleccione una categoría</option>
                <option value="Indumentaria">Indumentaria</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Hogar y Cocina">Hogar y Cocina</option>
              </select>
            </div>

            <div className="col-md-6" data-aos="fade-left">
              <label htmlFor="salePrice" className="form-label">Precio de Venta:</label>
              <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} required className="form-control" step="0.01" placeholder="Ej.: 29.99" />

              <label htmlFor="minStock" className="form-label mt-3">Stock Mínimo:</label>
              <input type="number" name="minStock" value={formData.minStock} onChange={handleChange} className="form-control" min="0" placeholder="Ej.: 10" />

              <label htmlFor="brandName" className="form-label mt-3">Marca:</label>
              <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} required className="form-control" placeholder="Ej.: Nike" />
            </div>
          </div>

          <div className="text-center mt-4 pt-1" >
            <button type="submit" className="btn btn-confirm">Registrar</button>
          </div>
        </form>

        {confirm && (
          <div className="alert alert-success mt-0 text-center mx-2" role="alert">
            <CheckCircle /> <span>¡Producto registrado exitosamente!</span>
            <br />
            <button className="btn btn-primary mt-2" onClick={handleRegisterPurchase}>
              Registrar Compra para este Producto
            </button>
          </div>
        )}

{error && <div className="alert alert-danger mt-1 text-center mx-2" role="alert"><AlertTriangle/><span className="m-2">{error}</span></div>}

        
      </div>
    </div>
  );
};

export default ProductRegister;

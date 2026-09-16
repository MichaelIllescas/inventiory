import { useState, useEffect, useMemo, useRef } from "react";
import { useRegisterPurchase } from "../api/useRegisterPurchase";
import { AlertTriangle, CheckCircle, ShoppingCart } from "lucide-react";
import { LoadingScreen } from "../../../components/LoadingScreen";
import useProducts from "../../products/api/useProductsActives";
import useProvidersActives from "../../providers/api/useProvidersActives";
import Select from "react-select";

const PurchaseRegister = ({ preselectedProduct = null }) => {
  const { registerPurchase, loading, error, setError } = useRegisterPurchase();
  const { products, fetchProducts } = useProducts();
  const { providers, fetchProviders } = useProvidersActives();

  const [confirm, setConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    productId: preselectedProduct || "",
    providerId: "",
    purchasePrice: "",
    quantity: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const hasFetchedProducts = useRef(false);
  const hasFetchedProviders = useRef(false);

  useEffect(() => {
    if (!hasFetchedProducts.current) {
      fetchProducts();
      hasFetchedProducts.current = true;
    }
    if (!hasFetchedProviders.current) {
      fetchProviders();
      hasFetchedProviders.current = true;
    }
  }, []);

  const memoizedProducts = useMemo(() => products, [products]);
  const memoizedProviders = useMemo(() => providers, [providers]);

  useEffect(() => {
    if (preselectedProduct && memoizedProducts.length > 0) {
      const product = memoizedProducts.find((p) => p.id === preselectedProduct);
      setSelectedProduct(product || null);
      setFormData((prev) => ({ ...prev, productId: preselectedProduct }));
    }
  }, [preselectedProduct, memoizedProducts]);

  const handleChange = (selectedOption, action) => {
    setFormData({ ...formData, [action.name]: selectedOption?.value || "" });

    if (action.name === "productId") {
      const product = memoizedProducts.find((p) => p.id === selectedOption?.value);
      setSelectedProduct(product || null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!formData.productId || !formData.providerId || !formData.purchasePrice || !formData.quantity) {
      setError("Todos los campos son obligatorios.");
      return;
    }
  
    const result = await registerPurchase(formData);
    if (result) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 5000);
  
      // Resetear el formulario a los valores iniciales
      setFormData({
        productId: "",
        providerId: "",
        purchasePrice: "",
        quantity: "",
        purchaseDate: new Date().toISOString().split("T")[0], // Restablecer fecha actual
        notes: "",
      });
  
      setSelectedProduct(null); // Limpiar detalles del producto seleccionado
    }
  };
  

  if (loading) return <LoadingScreen />;

  return (
    <div className="mt-2 d-flex align-items-center justify-content-center flex-column">
      <div className="col-sm-12 col-md-12 col-lg-12 pb-3">
        <h2 className="text-center pt-2">
          <ShoppingCart size={24} className="me-2" />
          Registrar Compra
        </h2>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="row">
            {/* Primera columna */}
            <div className="col-md-6">
              <label htmlFor="productId" className="form-label">Producto:</label>
              <Select
                name="productId"
                value={memoizedProducts
                  .map(product => ({ value: product.id, label: `${product.name} - ${product.code}` }))
                  .find(option => option.value === formData.productId) || null}
                onChange={handleChange}
                options={memoizedProducts.map(product => ({
                  value: product.id,
                  label: `${product.name} - ${product.code}`
                }))}
                placeholder="Seleccione un producto"
                isSearchable
              />

              <label htmlFor="providerId" className="form-label mt-3">Proveedor:</label>
              <Select
                name="providerId"
                value={memoizedProviders
                  .map(provider => ({ value: provider.id, label: provider.name }))
                  .find(option => option.value === formData.providerId) || null}
                onChange={handleChange}
                options={memoizedProviders.map(provider => ({
                  value: provider.id,
                  label: provider.name
                }))}
                placeholder="Seleccione un proveedor"
                isSearchable
              />

              <label htmlFor="purchaseDate" className="form-label mt-3">Fecha de Compra:</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>

            {/* Segunda columna */}
            <div className="col-md-6">
              <label htmlFor="purchasePrice" className="form-label">Precio de Compra:</label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleInputChange}
                required
                className="form-control"
                step="0.01"
                placeholder="Ej.: 19.99"
              />

              <label htmlFor="quantity" className="form-label mt-3">Cantidad:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="form-control"
                min="1"
                placeholder="Ej.: 100"
              />

              <label htmlFor="notes" className="form-label mt-3">Observaciones:</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Notas adicionales (opcional)"
              ></textarea>
            </div>
          </div>

          {/* Mostrar detalles del producto seleccionado */}
          {selectedProduct && (
  <div className="row mt-3">
    {/* Primera columna */}
    <div className="col-md-6">
      <div className="p-3 border rounded">
        <h5>Detalles del Producto:</h5>
        <p><strong>Código:</strong> {selectedProduct.code}</p>
        <p><strong>Nombre:</strong> {selectedProduct.name}</p>
        <p><strong>Descripción:</strong> {selectedProduct.description}</p>
      </div>
    </div>

    {/* Segunda columna */}
    <div className="col-md-6">
      <div className="p-3 border rounded">
        <p><strong>Precio de Venta:</strong> ${selectedProduct.salePrice}</p>
        <p><strong>Stock Mínimo:</strong> {selectedProduct.minStock}</p>
        <p><strong>Categoría:</strong> {selectedProduct.category}</p>
        <p><strong>Marca:</strong> {selectedProduct.brandName}</p>
      </div>
    </div>
  </div>
)}


          <div className="text-center mt-4">
            <button type="submit" className="btn btn-confirm">Registrar Compra</button>
          </div>
        </form>

        {/* Confirmación */}
        {confirm && (
          <div className="alert alert-success mt-3 text-center">
            <CheckCircle className="me-2" /> ¡Compra registrada exitosamente!
          </div>
        )}

        {/* Mostrar error si hay uno */}
        {error && (
          <div className="alert alert-danger text-center">
            <AlertTriangle className="me-2" /> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseRegister;

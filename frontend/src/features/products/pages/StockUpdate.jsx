import React, { useState } from "react";
import Select from "react-select";
import useFetchProducts from "../api/useProductsActives";
import useUpdateStock from "../api/useUpdateStock";
import { LoadingScreen } from "../../../components/LoadingScreen";

const UpdateStock = () => {
  const { products, loading, error, fetchProducts } = useFetchProducts();
  const {
    updateStock,
    loading: updating,
    error: updateError,
  } = useUpdateStock();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockUpdate, setStockUpdate] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleStockUpdate = (event) => {
    setStockUpdate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage(null);

    if (!selectedProduct || stockUpdate === "") {
        setErrorMessage('⚠️Debe Seleccionar un producto y asignale un nuevo stock.')
      return;
    }

    try {
      await updateStock(selectedProduct.id, parseFloat(stockUpdate));

      setSuccessMessage("✅¡Stock actualizado correctamente! ");
      setErrorMessage('')

      //  Volver a cargar los productos desde la API para reflejar el stock actualizado
      fetchProducts();

      //  Limpiar los campos
      setSelectedProduct(null);
      setStockUpdate("");
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
    }
  };

  if (loading) return <LoadingScreen />;
  return (
    <div className="content mt-5 pt-4 d-flex justify-content-center">
      <div
        className="bg-index container-fluid pb-0 stock-container"
        style={{ maxWidth: "700px" }}
      >
       
        <div className="card p-4">
        <h1 className="typing-text">Actualizar Stock de Productos</h1>

          {/* Selección de Producto */}
          <div className="form-group mb-3">
            <label className="form-label">Seleccionar Producto:</label>
            {loading ? (
              <p>Cargando productos...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <Select
                options={products.map((product) => ({
                  value: product.id,
                  label: `${product.name}, marca ${product.brandName}, código ${product.code}`,
                }))}
                onChange={(option) => {
                  setSelectedProduct(option ? products.find((p) => p.id === option.value) : null);
                }}
                isClearable
                placeholder="Seleccione un producto..."
                value={
                  selectedProduct
                    ? {
                        value: selectedProduct.id,
                        label: `${selectedProduct.name}, marca ${selectedProduct.brandName}, código ${selectedProduct.code}`,
                      }
                    : null
                }
              />
            )}
          </div>

          {/* Información del Producto Seleccionado */}
          <div className="form-group mb-3">
            <h6>Información del Producto:</h6>
            {selectedProduct ? (
              <>
                <p>
                  <strong>Nombre:</strong> {selectedProduct.name}
                </p>
                <p>
                  <strong>Descripción:</strong> {selectedProduct.description}
                </p>
                <p>
                  <strong>Stock Actual:</strong> {selectedProduct.stock}
                </p>
              </>
            ) : (
              <p>No hay producto seleccionado</p>
            )}
          </div>

          {/* Input para Actualizar Stock */}
          <div className="form-group mb-3">
            <label htmlFor="quantity">Actualizar Stock:</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              step="1"
              required
              value={stockUpdate}
              onChange={handleStockUpdate}
            />
          </div>

          {/* Botón de Enviar */}
          <div className="text-center">
          <button
            type="submit"
            className="btn btn-confirm m-auto"
            onClick={handleSubmit}
            disabled={updating}
          >
            {updating ? "Actualizando..." : "Actualizar Stock"}
          </button>
          </div>
          

          {/* Mensajes de Confirmación o Error */}
          {successMessage && (
            <p className="text-success text-center mt-3">{successMessage}</p>
          )}
          {updateError && (
            <p className="text-danger text-center mt-3">{updateError}</p>
          )}
           {errorMessage && (
            <p className="text-danger text-center mt-3">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateStock;

import React, { useEffect, useState } from "react";
import Select from "react-select";
import useFetchProducts from "../api/useProducts";
import useModifyPrice from "../api/useModifyPrice";

const ModifyPrice = () => {
  const { products, loading, error, fetchProducts } = useFetchProducts();
  const { modifyPrices, loading: modifying, error: modifyError } = useModifyPrice();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [percentage, setPercentage] = useState("");
  const [action, setAction] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchProducts(); 
  }, []); 
  // Función para manejar el cambio de porcentaje
  const handlePercentageChange = (event) => {
    setPercentage(event.target.value);
  };

  // Función para manejar el envío de datos
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage(null);

    // Validar que todos los datos sean correctos antes de enviar
    if (selectedProducts.length === 0 || !action || percentage === "") {
      setErrorMessage("⚠️ Seleccione productos, acción y un porcentaje válido.");
      return;
    }

    try {
      await modifyPrices(
        selectedProducts.map((p) => p.value), // IDs de productos
        "salePrice", // 🔹 Ahora solo afecta `salePrice`
        parseFloat(percentage), // Convertir a número el porcentaje
        action // "increase" o "discount"
      );

      setSuccessMessage(`✅¡Precios ${action === "increase" ? "aumentados" : "reducidos"} correctamente! `);
      setErrorMessage('');
      
      // Recargar productos con los nuevos precios
      fetchProducts();

      // Limpiar campos
      setSelectedProducts([]);
      setPercentage("");
      setAction(null);
    } catch (error) {
      console.error("⛔ Error al modificar los precios:", error);
      setErrorMessage("Error al modificar los precios. Inténtelo nuevamente.");
    }
  };

  return (
    <div className="content mt-5 pt-4 d-flex justify-content-center">
      <div className="bg-index container-fluid pb-0 price-container" style={{ maxWidth: "500px" }}>
        <div className="card p-4">
          <h1 className="text-center mb-3">Actualizar Precios %</h1>

          {/* Selección de Productos */}
          <label className="form-label">Seleccionar Productos:</label>
          <Select
            options={products.map((product) => ({
              value: product.id,
              label: product.code ? `${product.name} (Código: ${product.code})` : product.name,
            }))}
            onChange={(options) => setSelectedProducts(options || [])}
            isMulti
            isClearable
            placeholder="Seleccione productos..."
            value={selectedProducts}
          />

          {/* Selección de Acción (Aumento o Descuento) */}
          <label className="form-label mt-3">Seleccione la acción:</label>
          <Select
            options={[
              { value: "increase", label: "Aumentar Precio" },
              { value: "discount", label: "Aplicar Descuento" },
            ]}
            onChange={(option) => setAction(option ? option.value : null)}
            isClearable
            placeholder="Seleccione acción..."
            value={action ? { value: action, label: action === "increase" ? "Aumentar Precio" : "Aplicar Descuento" } : null}
          />

          {/* Input para el porcentaje */}
          <label className="form-label mt-3">Porcentaje de modificación (%):</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ejemplo: 10 para 10%"
            value={percentage}
            onChange={handlePercentageChange}
          />

          {/* Botón de Aplicar */}
          <div className="text-center">
            <button
              className="btn btn-confirm mt-3"
              onClick={handleSubmit}
              disabled={modifying}
            >
              {modifying ? "Modificando..." : "Aplicar"}
            </button>
          </div>

          {/* Mensajes de confirmación o error */}
          {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
          {modifyError && <p className="text-danger text-center mt-3">{modifyError}</p>}
          {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ModifyPrice;

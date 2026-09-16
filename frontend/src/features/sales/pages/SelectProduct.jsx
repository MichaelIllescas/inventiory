import { useState, useEffect } from "react";
import Select from "react-select";
import useProductsActives from "../../products/api/useProductsActives";

const SelectProduct = ({ onProductoSeleccionado, productosSeleccionados }) => {
  const { products, loading, error, fetchProducts } = useProductsActives();
  const [availableProducts, setAvailableProducts] = useState([]);

  // Actualiza la lista de productos disponibles cuando cambia la lista de productos seleccionados
  useEffect(() => {
    
    setAvailableProducts(
      products.filter(
        (product) => !productosSeleccionados.some((p) => p.id === product.id)
      )
    );
  }, [products, productosSeleccionados]); // Se ejecuta cada vez que cambian los productos disponibles o seleccionados

  return (
    <div>
      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}

      <Select
        options={availableProducts.map((producto) => ({
          value: producto.id,
          label: `${producto.code} - ${producto.name} - $${producto.salePrice}`,
          salePrice: producto.salePrice, // Se mantiene el precio para calcular el total después
        }))}
        onChange={onProductoSeleccionado}
        placeholder="Buscar producto..."
        isClearable
      />
    </div>
  );
};

export default SelectProduct;

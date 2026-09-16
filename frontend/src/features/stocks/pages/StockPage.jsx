import React, { useMemo, useEffect, useState } from "react";
import useProducts from "../../products/api/useProductsActives";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import StockMovementModal from "../../products/pages/StockMovementModal";
import { ClipboardPlus } from "lucide-react";

const StockPage = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockFilter, setStockFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleProducts = useMemo(() => {
    if (stockFilter === "low") {
      return products.filter((product) => Number(product.stock) <= Number(product.minStock || 0));
    }
    if (stockFilter === "out") {
      return products.filter((product) => Number(product.stock) === 0);
    }
    return products;
  }, [products, stockFilter]);

  const columns = useMemo(
    () => [
      { Header: "CÓDIGO", accessor: "code" },
      { Header: "NOMBRE", accessor: "name" },
      { Header: "MARCA", accessor: "brandName" },
      { Header: "PRECIO VENTA", accessor: "salePrice", Cell: ({ value }) => `$${value.toFixed(2)}` },
      { Header: "STOCK", accessor: "stock" },
      { Header: "STOCK MÍNIMO", accessor: "minStock" },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            title="Registrar movimiento de stock"
            aria-label={`Registrar movimiento para ${row.original.name}`}
            onClick={() => setSelectedProduct(row.original)}
          >
            <ClipboardPlus size={18} />
          </button>
        ),
      },
    ],
    []
  );

  const handleRegisteredMovement = (result) => {
    setSelectedProduct(null);
    fetchProducts();
    return result;
  };

  // Función para definir clases de fila según el stock
  const getRowClass = (row) => {
    const stock = Number(row.original.stock);
    const minStock = Number(row.original.minStock || 0);
    
    if (stock === 0) return "table-danger";
    if (stock <= minStock) return "table-warning";
    return "";
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive table" data-aos="fade-left">
        <h2>Stock de Productos</h2>
        <div className="btn-group mb-3 stock-filter" role="group" aria-label="Filtrar stock">
          <button
            type="button"
            className={`btn btn-sm ${stockFilter === "all" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setStockFilter("all")}
          >
            Todos
          </button>
          <button
            type="button"
            className={`btn btn-sm ${stockFilter === "low" ? "btn-warning" : "btn-outline-dark"}`}
            onClick={() => setStockFilter("low")}
          >
            Stock bajo
          </button>
          <button
            type="button"
            className={`btn btn-sm ${stockFilter === "out" ? "btn-danger" : "btn-outline-dark"}`}
            onClick={() => setStockFilter("out")}
          >
            Sin stock
          </button>
        </div>
        <DataTable columns={columns} data={visibleProducts} getRowClass={getRowClass} striped={false} />
      </div>
      <StockMovementModal
        show={Boolean(selectedProduct)}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRegistered={handleRegisteredMovement}
      />
    </div>
  );
};

export default StockPage;

import React, { useMemo, useEffect } from "react";
import useProducts from "../../products/api/useProductsActives";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";

const StockPage = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Definir columnas de la tabla
  const columns = useMemo(
    () => [
      { Header: "CÓDIGO", accessor: "code" },
      { Header: "NOMBRE", accessor: "name" },
      { Header: "MARCA", accessor: "brandName" },
      { Header: "PRECIO VENTA", accessor: "salePrice", Cell: ({ value }) => `$${value.toFixed(2)}` },
      { Header: "STOCK", accessor: "stock" },
      { Header: "STOCK MÍNIMO", accessor: "minStock" },
    ],
    []
  );

  // Función para definir clases de fila según el stock
  const getRowClass = (row) => {
    const stock = row.values.stock;
    const minStock = row.values.minStock;
    
    if (stock === 0) return "table-danger"; // Stock agotado → Rojo
    if (stock <= minStock) return "table-warning"; // Stock bajo → Amarillo
    return ""; // Stock normal → Sin color
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive table" data-aos="fade-left">
        <h2>Stock de Productos</h2>
        <DataTable columns={columns} data={products || []} getRowClass={getRowClass} striped={false} />
      </div>
    </div>
  );
};

export default StockPage;

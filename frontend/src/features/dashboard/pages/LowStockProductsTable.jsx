import React from "react";
import DataTable from "../../../components/DataTable";

const LowStockProductsTable = ({ prod }) => {
  const columns = [
    { Header: "CODE", accessor: "code" },
    { Header: "Producto", accessor: "name" },
    { Header: "Stock Actual", accessor: "stock" },
    { Header: "Stock Mínimo", accessor: "minStock" },
  ];

  // Clase de estilo por fila según stock
  const getRowClass = (row) => {
    const stock = row.values.stock;
    const minStock = row.values.minStock;

    if (stock === 0) return "table-danger";
    if (stock <= minStock) return "table-warning";
    return "";
  };

  return (
    <div className="card p-3">
      <h4 className="text-center">⚠️ Productos con Stock Bajo</h4>
      <DataTable
        columns={columns}
        data={prod || []}
        getRowClass={getRowClass}
        striped={false}
      />
    </div>
  );
};

export default LowStockProductsTable;

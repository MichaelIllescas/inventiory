import React from "react";
import DataTable from "../../../components/DataTable";
import { AlertTriangle } from "lucide-react";

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
      <h4 className="text-center d-flex align-items-center justify-content-center gap-2"><AlertTriangle size={20} strokeWidth={1.75} /> Productos con Stock Bajo</h4>
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

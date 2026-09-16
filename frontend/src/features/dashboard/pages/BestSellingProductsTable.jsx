import React from "react";
import DataTable from "../../../components/DataTable";

const BestSellingProductsTable = ({ prod }) => {
  // Mapeamos los datos que vienen del backend
  const productos = prod?.map((producto, index) => ({
    id: index + 1,
    nombre: producto.productName,
    ventas: producto.totalQuantitySold,
  })) || [];

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Producto", accessor: "nombre" },
    { Header: "Ventas", accessor: "ventas" },
  ];

  return (
    <div className="card p-3">
      <h4 className="text-center">🔥 Productos Más Vendidos</h4>
      <DataTable columns={columns} data={productos} />
    </div>
  );
};

export default BestSellingProductsTable;

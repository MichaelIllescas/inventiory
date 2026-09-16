import DataTable from "../../../components/DataTable";
import { Trophy } from "lucide-react";

const TopCustomersTable = ({ prod }) => {
  const clientes = prod?.map((cliente, index) => ({
    id: index + 1,
    customerName: cliente.customerName,
    documentNumber: cliente.documentNumber,
    totalPurchases: cliente.totalPurchases,
    totalSpent: cliente.totalSpent,
  })) || [];

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Cliente", accessor: "customerName" },
    { Header: "Documento", accessor: "documentNumber" },
    { Header: "Compras", accessor: "totalPurchases" },
    {
      Header: "Total Gastado",
      accessor: "totalSpent",
      Cell: ({ value }) => `$${Number(value).toLocaleString()}`,
    },
  ];

  return (
    <div className="card p-3">
      <h4 className="text-center d-flex align-items-center justify-content-center gap-2"><Trophy size={20} strokeWidth={1.75} /> Ranking de Clientes</h4>
      <DataTable columns={columns} data={clientes} />
    </div>
  );
};

export default TopCustomersTable;

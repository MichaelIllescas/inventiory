import { useState, useEffect } from "react";
import Select from "react-select";
import useClients from "../../clients/api/UseClients";

const SelectCliente = ({ onClienteSeleccionado, clienteSeleccionado }) => {
  const { clients, loading, error, fetchClients } = useClients();
  const [availableClients, setAvailableClients] = useState([]);
  useEffect(() => {
    fetchClients();
  }, []);
  
  useEffect(() => {
    setAvailableClients(
      clients.filter(
        (client) => !clienteSeleccionado || client.id !== clienteSeleccionado.id
      )
    );
  }, [clients, clienteSeleccionado]);

  return (
    <div>
      {loading && <p>Cargando clientes...</p>}
      {error && <p className="text-danger">{error}</p>}

      <Select
        options={availableClients.map((cliente) => ({
          value: cliente.id,
          label: `${cliente.name} ${cliente.lastname}, D.N.I. Nro. ${cliente.documentNumber}`,
          data: cliente, // Aquí pasamos todo el objeto cliente
        }))}
        onChange={(selectedOption) => onClienteSeleccionado(selectedOption?.data || null)}
        placeholder="Buscar cliente..."
        isClearable
      />
    </div>
  );
};

export default SelectCliente;

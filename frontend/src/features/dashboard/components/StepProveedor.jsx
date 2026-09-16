import { Truck } from "lucide-react";

const StepProveedor = () => {
  return (
    <div style={{ textAlign: "left", padding: "0.5rem 0.5rem 0 0.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
        <Truck size={24} style={{ marginRight: "0.5rem" }} />
        <h5 style={{ margin: 0 }}>Registrar Proveedor</h5>
      </div>
      <p style={{ marginBottom: 0 }}>
        Este apartado te permite registrar a tus proveedores. Es el primer paso para empezar a cargar tus productos.
      </p>
    </div>
  );
};

export default StepProveedor;

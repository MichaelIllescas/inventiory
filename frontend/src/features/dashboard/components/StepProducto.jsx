import { Package } from "lucide-react";

const StepProducto = () => {
  return (
    <div style={{ textAlign: "left", padding: "0.5rem 0.5rem 0 0.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
        <Package size={24} style={{ marginRight: "0.5rem" }} />
        <h5 style={{ margin: 0 }}>Registrar Producto</h5>
      </div>
      <p style={{ marginBottom: 0 }}>
        Aquí registrás los productos que comprás a tus proveedores para poder luego venderlos. 🎯
      </p>
    </div>
  );
};

export default StepProducto;

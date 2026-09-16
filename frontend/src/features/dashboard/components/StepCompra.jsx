import { ShoppingCart } from "lucide-react";

const StepCompra = () => {
  return (
    <div style={{ textAlign: "left", padding: "0.5rem 0.5rem 0 0.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
        <ShoppingCart size={24} style={{ marginRight: "0.5rem" }} />
        <h5 style={{ margin: 0 }}>Registrar Compra</h5>
      </div>
      <p style={{ marginBottom: 0 }}>
        Aquí cargás las compras que realizás a tus proveedores. Esto actualiza el stock de tus productos. 📦
      </p>
    </div>
  );
};

export default StepCompra;

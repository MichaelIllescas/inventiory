import { Truck } from "lucide-react";

const StepVenta = () => {
  return (
    <div style={{ textAlign: "left", padding: "0.5rem 0.5rem 0 0.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
        <Truck size={24} style={{ marginRight: "0.5rem" }} />
        <h5 style={{ margin: 0 }}>Registrar Venta</h5>
      </div>
      <p style={{ marginBottom: 0 }}>
        Aquí registrás tus ventas. Se descuenta el stock y se genera el historial del cliente. ¡Todo listo para vender! 🎉
      </p>
    </div>
  );
};

export default StepVenta;

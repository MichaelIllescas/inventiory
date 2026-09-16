import logo from "../../../assets/img/logo.png"; // ajustá el path si es necesario

const WelcomeStep = () => {
  return (
    <div style={{ textAlign: "center", minWidth:"270px", padding: "0.5rem 0.5rem 0 0.5rem" }}>
      <div style={{ display: "flex flex-column", alignItems: "center", marginBottom: "0.5rem" }}>
      <img src={logo} alt="Logo Inventiory" width="70" style={{ marginBottom: "1rem" }} />
      <h4>¡Bienvenido a Inventiory!</h4>
      <p>
        Te mostraremos los pasos básicos para comenzar con la gestión de tu negocio. 🚀
      </p>
      </div>
    </div>
  );
};

export default WelcomeStep;

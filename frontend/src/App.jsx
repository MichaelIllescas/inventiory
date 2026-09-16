import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "../src/router/AppRouter";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  
    useEffect(() => {
      AOS.init({ duration: 1000, once: true });
    }, []); // Ejecuta solo una vez al montar el componente
  return (
    
      <AppRoutes />
    
  );
};
export default App;
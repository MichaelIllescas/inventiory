import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

 import '../src/styles/global.css';




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Router>
    <AuthProvider> 
        <App />
    </AuthProvider>
      </Router>
  </React.StrictMode>
);


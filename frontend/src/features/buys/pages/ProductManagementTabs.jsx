import { useState } from "react";
import ProductRegister from "../../products/pages/ProductRegister";
import PurchaseRegister from "./PurchaseRegister";

const ProductManagementTabs = () => {
  const [activeTab, setActiveTab] = useState("register-product");
  const [preselectedProduct, setPreselectedProduct] = useState(null);

  const handleTabChange = (tab) => {
    console.log(`Cambiando a tab: ${tab}`);
    setActiveTab(tab);
  };

  return (
    <div className="mt-3 pt-2">
    <div className="container mt-5 pt-3 card col-sm-12 col-md-8 col-lg-8">
      {/* Tabs de navegación */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "register-product" ? "active" : ""}`}
            onClick={() => handleTabChange("register-product")}
          >
            Registrar Producto
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "register-purchase" ? "active" : ""}`}
            onClick={() => handleTabChange("register-purchase")}
          >
            Registrar Compra
          </button>
        </li>
      </ul>

      {/* Contenido de los tabs */}
      <div className="tab-content mt-3">
        {activeTab === "register-product" && (
          <ProductRegister setActiveTab={setActiveTab} setPreselectedProduct={setPreselectedProduct} />
        )}
        {activeTab === "register-purchase" && (
          <PurchaseRegister preselectedProduct={preselectedProduct} />
        )}
      </div>
    </div>
    </div>
  );
};

export default ProductManagementTabs;

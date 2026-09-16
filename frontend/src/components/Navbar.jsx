  import { Link } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.bundle.min.js";
  import apiClient from "../config/axiosConfig";
  import logo from "../assets/img/logo.png";
  import NavbarItem from "./NavbarItem";
  import NavbarDropdown from "./NavbarDropdown";
  import UserMenu from "./UserMenu";
  import { useAuth } from "../../src/contexts/AuthContext";
  import "../styles/nav.css";
  import {
    Users,
    UserPlus,
    List,
    Truck,
    Package,
    RefreshCcw,
    LucideTrendingUpDown,
    UserCheck,
    ShoppingCart,
    ClipboardList,
    DollarSign,
    ShoppingBag ,
    LineChart ,
    Table , 
    BarChart ,
    Calendar ,
    LucideChartBarIncreasing,
    LucideChartBarStacked,
    PilcrowRight
  } from "lucide-react";
  import "../styles/nav.css";
import InventoryTour from "../features/dashboard/pages/InventoryTour";
import { useRef } from "react";
  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error al intentar cerrar la sesión.");
    }
  };

  const Navbar = () => {

    const { user } = useAuth();
    const role = user?.roles?.[0]?.authority;
    const userName = user?.Name
    const navRef = useRef(null);


    

    return (
      <>
      <nav ref={navRef} className="navbar navbar-expand-lg fixed-top">

        <div className="container">
          <Link to="/dashboard" className="navbar-brand">
            <img
              src={logo}
              width="55"
              height="50"
              alt="Logo Inventiory"
              className="rotate-center"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav me-auto ">
              {/* products managenent */}
              <NavbarDropdown text="Productos" icon={Package} dropdownId="dropdown-producto">
                <hr />
                <NavbarItem
                  url="/productRegister"
                  icon={Package}
                  text="Registrar Producto"
                   id="tour-producto"
                />
                <hr />
                <NavbarItem
                  url="/productsList"
                  icon={List}
                  text="Lista de Productos"
                />
                <hr />
                <NavbarItem
                  url="/stocksList"
                  icon={ClipboardList}
                  text="Ver Stcoks"
                />
                <hr />
                  {/* <NavbarItem
                    url="/updateStock"
                    icon={RefreshCcw}
                    text="Actualizar Stocks"
                  />
                  <hr /> */}

                <NavbarItem
                  url="/updatePrice"
                  icon={LucideTrendingUpDown}
                  text="Actualización de Precios"
                />
                <hr />
              </NavbarDropdown>
              {/* providers managenent */}
              <NavbarDropdown text="Proveedores" icon={Truck} dropdownId="proveedores-dropdown">
                <hr />
                <NavbarItem
                  url="/providerRegister"
                  icon={Truck}
                  text="Registrar Proveedor"
                  id="tour-proveedor"
                />
                <hr />
                <NavbarItem
                  url="/providerList"
                  icon={List}
                  text="Lista de Proveedores"
                />
                <hr />
              </NavbarDropdown>
              {/* clients managenent */}
              <NavbarDropdown text="Clientes" icon={UserCheck}>
                <hr />
                <NavbarItem
                  url="/clientRegister"
                  icon={UserCheck}
                  text="Registrar Cliente"
                   id="tour-cliente"
                />
                <hr />
                <NavbarItem
                  url="/clientsList"
                  icon={List}
                  text="Lista de Clientes"
                />
                <hr />
              </NavbarDropdown>
        
              {/* buys managenent */}
              <NavbarDropdown text="Compras" icon={ShoppingCart} dropdownId="dropdown-compra">
                <hr />
                <NavbarItem
                  url="/buyRegister"
                  icon={ShoppingCart}
                  text="Registrar Compra"
                   id="tour-compra"
                />
                <hr />
                <NavbarItem
                  url="/buistHistory"
                  icon={List}
                  text="Historial de Compras"
                />
                <hr />
                <li className="mx-5">Otros Gastos  </li><hr />
                <NavbarItem
                  url="/expenseRegister"
                  icon={DollarSign}
                  text="Registrar Gasto"
                />
                <hr />
                <NavbarItem
                  url="/expensesList"
                  icon={List}
                  text="Lista de Gastos"
                />
          <hr />
              </NavbarDropdown>
        
              {/* Sales managenent */}
              <NavbarDropdown text="Ventas" icon={ShoppingBag} dropdownId="dropdown-venta">
                <hr />
                <NavbarItem
                  url="/saleRegister"
                  icon={Truck}
                  text="Registrar Venta"
                   id="tour-venta"
                />
                <hr />
                <NavbarItem
                  url="/salesList"
                  icon={List}
                  text="Historial de Ventas"
                />
            <hr />
              </NavbarDropdown>

              {/* Repots managenent */}
              <NavbarDropdown text="Reportes" icon={LineChart } dropdownId="dropdown-cliente">
                            <hr />
                            <NavbarItem
                              url="/dailyincome"
                              icon={Table }
                              text="Ingresos diarios"
                            />
                            <hr />
                            <NavbarItem
                              url="/monthlyIncome"
                              icon={BarChart }
                              text="Ingresos Mensuales"
                            />
                        <hr />
                        <NavbarItem
                              url="/anualIncome"
                              icon={Calendar  }
                              text="Ingresos Anuales"
                            />
                        <hr />
                        <NavbarItem
                              url="/topCustomers"
                              icon={LucideChartBarStacked  }
                              text="Ranking de Clientes"
                            />
                        <hr />
                        <NavbarItem
                              url="/topProducts"
                              icon={LucideChartBarIncreasing  }
                              text="Ranking de Productos"
                            />
                        <hr />
                        <NavbarItem
                              url="/profiability"
                              icon={PilcrowRight  }
                              text="Rentabilidad"
                            />
                        <hr />
              </NavbarDropdown>


     {/* users managenent */}
              {role === "ADMIN" && (

         
              <NavbarDropdown text="Usuarios" icon={Users}>
                <hr />
                <NavbarItem
                  url="/userRegister"
                  icon={UserPlus}
                  text="Registrar Usuario"
                />
                <hr />
                <NavbarItem
                  url="/userList"
                  icon={List}
                  text="Lista de Usuarios"
                />
                <hr />
              </NavbarDropdown>

              )}
            </ul>



            {/* Menú de Usuario */}
            <ul className="navbar-nav ms-auto">
              <UserMenu handleLogout={handleLogout} user={userName} />
            </ul>
          </div>
        </div>
      
      </nav>
        <InventoryTour />
        
        </>
    );
  };

  export default Navbar;

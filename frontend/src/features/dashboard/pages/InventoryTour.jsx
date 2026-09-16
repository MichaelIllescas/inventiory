import Joyride from "react-joyride";
import { useEffect, useState } from "react";
import WelcomeStep from "../components/WelcomeStep";
import StepProveedor from "../components/StepProveedor.jsx";
import StepProducto from "../components/StepProducto.jsx";
import StepCompra from "../components/StepCompra.jsx";
import StepVenta from "../components/StepVenta.jsx";
import CustomTooltip from "../components/CustomTooltip.jsx";
import '../../../styles/tour-fix.css';
import "../../../styles/nav.css";

const InventoryTour = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  let dropdownTimeout = null;

  const steps = [
    {
      target: "body",
      placement: "center",
      content: <WelcomeStep />,
      disableOverlay: true,
  disableScrolling: true,
    },
    {
      target: "#tour-proveedor",
      placement: "bottom",
      content: <StepProveedor />,
      disableOverlay: true,
  disableScrolling: true,
    },
    {
      target: "#tour-producto",
      placement: "bottom",
      content: <StepProducto />,
      disableOverlay: true,
  disableScrolling: true,
    },
    {
      target: "#tour-compra",
      placement: "bottom",
      content: <StepCompra />,
      disableOverlay: true,
      disableScrolling: true,
    },
    {
      target: "#tour-venta",
      placement: "bottom",
      content: <StepVenta />,
      disableOverlay: true,
  disableScrolling: true,
    },
  ];

  useEffect(() => {
    setRun(true);
  }, []);

  const dropdownMap = {
    1: "#proveedores-dropdown",
    2: "#dropdown-producto",
    3: "#dropdown-compra",
    4: "#dropdown-venta",
  };

  const closeAllDropdowns = () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");

      const toggle = dropdown.querySelector(".dropdown-toggle");
      const menu = dropdown.querySelector(".dropdown-menu");

      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.classList.remove("show");
        toggle.blur(); // remueve focus visual
      }

      if (menu) {
        menu.classList.remove("show");
        menu.style.removeProperty("display");
        menu.style.removeProperty("position");
        menu.style.removeProperty("inset");
        menu.style.removeProperty("transform");
        menu.style.removeProperty("top");
        menu.style.removeProperty("left");
        menu.style.removeProperty("right");
        menu.style.removeProperty("z-index");
        menu.style.removeProperty("opacity");
      }
    });

    const backdrop = document.querySelector(".dropdown-backdrop");
    if (backdrop) backdrop.remove();
  };

  const closeNavbarMobile = () => {
    const navbarCollapse = document.querySelector("#navbarNav");
    const toggleButton = document.querySelector(".navbar-toggler");

    if (navbarCollapse?.classList.contains("show")) {
      if (toggleButton) toggleButton.click();
    }

    if (navbarCollapse) {
      navbarCollapse.classList.remove("collapsing");
      navbarCollapse.classList.remove("show");
      navbarCollapse.classList.add("collapse");
    }

    if (toggleButton) {
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.classList.remove("collapsed");
    }
  };

  const resetBodyStyles = () => {
    const cleanStyles = (el) => {
      if (!el) return;
      el.style.position = "";
      el.style.top = "";
      el.style.left = "";
      el.style.right = "";
      el.style.bottom = "";
      el.style.transform = "";
      el.style.zIndex = "";
      el.style.overflow = "";
      el.style.height = "";
      el.style.width = "";
    };
  
    cleanStyles(document.body);
    cleanStyles(document.documentElement);
  
    // NUEVO: limpiar el NAV si quedó con stacking roto
    const nav = document.querySelector("nav.navbar");
    cleanStyles(nav);
  
    document.body.classList.remove("react-joyride__body--prevent-scroll");
    document.body.classList.remove("react-joyride__scroll-parent");
    document.body.classList.remove("react-joyride__body--fixed");
  
    // Forzar reflow
    void document.body.offsetHeight;
  };
  

  const waitForVisible = (selector, callback, tries = 0) => {
    const el = document.querySelector(selector);
    if (el && el.offsetParent !== null) {
      callback();
    } else if (tries < 20) {
      setTimeout(() => waitForVisible(selector, callback, tries + 1), 150);
    } else {
      console.warn(`⛔ No se pudo mostrar el elemento ${selector}`);
      callback();
    }
  };

  const openDropdown = (stepIdx) => {
    const id = dropdownMap[stepIdx];
    if (!id) return;

    closeAllDropdowns();

    const navbarCollapse = document.querySelector("#navbarNav");
    const isCollapsed = navbarCollapse?.classList?.contains("collapse") &&
      !navbarCollapse?.classList?.contains("show");

    if (isCollapsed) {
      const toggleButton = document.querySelector(".navbar-toggler");
      if (toggleButton) toggleButton.click();
    }

    dropdownTimeout = setTimeout(() => {
      const dropdown = document.querySelector(id);
      const menu = dropdown?.querySelector(".dropdown-menu");
      const toggle = dropdown?.querySelector(".dropdown-toggle");

      if (dropdown && menu && toggle) {
        dropdown.classList.add("show");
        menu.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
      }
    }, 300);
  };

  const handleCallback = ({ type, index, lifecycle, action, status }) => {
    let nextIndex = index;

    if (type === "step:after" && lifecycle === "complete") {
      if (action === "prev") {
        nextIndex = index - 1;
      } else if (action === "next") {
        nextIndex = index + 1;
      }

      if (dropdownMap[nextIndex]) {
        openDropdown(nextIndex);
        const nextTarget = steps[nextIndex]?.target;
        waitForVisible(nextTarget, () => {
          setStepIndex(nextIndex);
        });
      } else {
        closeAllDropdowns();
        closeNavbarMobile();
        setStepIndex(nextIndex);
      }
    }

    if (
      (type === "step:after" && action === "skip") ||
      type === "tour:end" ||
      status === "skipped"
    ) {
      if (dropdownTimeout) clearTimeout(dropdownTimeout);

      setTimeout(() => {
        closeAllDropdowns();
        closeNavbarMobile();
        resetBodyStyles();     // 💡 solución clave
        setRun(false);
        setStepIndex(0);
      }, 150);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      callback={handleCallback}
      showSkipButton
      showProgress
      tooltipComponent={CustomTooltip}
      styles={{
        options: {
          zIndex: 9999,
        },
      }}
    />
  );
};

export default InventoryTour;

import { forwardRef } from "react";
import { Link } from "react-router-dom";

const NavbarItem = forwardRef(({ url, icon: Icon, text, id }, ref) => {
  const handleClick = () => {
    const navCollapse = document.querySelector(".navbar-collapse.show");
    if (navCollapse) {
      const toggleButton = document.querySelector(".navbar-toggler");
      if (toggleButton) toggleButton.click();
    }
  };
  return (
    <li className="nav-item" ref={ref} id={id}>
      <Link to={url} className="nav-link d-flex align-items-center" onClick={handleClick}>
        {Icon && <Icon className="me-2" size={20} />}
        {text}
      </Link>
    </li>
  );
});

NavbarItem.displayName = "NavbarItem";
export default NavbarItem;

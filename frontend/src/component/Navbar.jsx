import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

import { AuthContext } from "../context/auth-context.js";

import "../css/navbar.css";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/performance", label: "Performance" },
  { path: "/analysis", label: "Analysis" },
  { path: "/recommendations", label: "Recommendations" },
];

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClicked(!clicked);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate("/dashboard")}>
        <img src="/logo.jpg" alt="SmartCrick logo" />
      </div>

      <div className="menu-icon" onClick={handleClick}>
        {clicked ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-links${isActive ? " active" : ""}`}
              onClick={handleClick}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-logout-desktop">
        <button onClick={handleLogout} className="logout-btn" type="button">
          Logout <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

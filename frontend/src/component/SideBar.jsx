import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaHome,
  FaLightbulb,
  FaPen,
  FaUserAlt,
} from "react-icons/fa";

import "../css/sidebar.css";

const menuItems = [
  { path: "/home", name: "Home", icon: <FaHome /> },
  { path: "/dashboard", name: "Dashboard", icon: <FaChartBar /> },
  { path: "/performance", name: "Performance", icon: <FaPen /> },
  { path: "/analysis", name: "Analysis", icon: <FaChartBar /> },
  { path: "/recommendations", name: "Recommendations", icon: <FaLightbulb /> },
  { path: "/profile", name: "Profile", icon: <FaUserAlt /> },
];

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
          >
            <div className="icon">{item.icon}</div>
            <div className="link-text">{item.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

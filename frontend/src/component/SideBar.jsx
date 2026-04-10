import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/sidebar.css";

import {
  FaHome,
  FaCompass,
  FaHeart,
  FaEnvelope,
  FaUserAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItem = [
    { path: "/Home", name: "Home", icon: <FaHome /> },
    { path: "/explore", name: "Explore", icon: <FaCompass /> },
    { path: "/notifications", name: "Notifications", icon: <FaHeart /> },
    { path: "/messages", name: "Messages", icon: <FaEnvelope /> },
    { path: "/profile", name: "Profile", icon: <FaUserAlt /> },
  ];

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Logo / Top */}
      

      {/* Search */}
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          readOnly={!isOpen} // only active when sidebar is expanded
        />
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="sidebar-link"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link-text">{item.name}</div>
          </NavLink>
        ))}
      </div>

      {/* More / Bottom */}
      <div id="more">
        <div className="sidebar-link">
          <div className="icon">⋯</div>
          <div className="link-text">More</div>
        </div>
    </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

import "../css/navbar.css";

const Navbar = () => {

    const { logout } = useContext(AuthContext);

  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClicked(!clicked);

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens)
    console.log("Logged out");
    navigate("/login");
  };


  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="/logo.jpg" alt="Logo" /> 
        
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="menu-icon" onClick={handleClick}>
        {clicked ? <FaTimes /> : <FaBars />}
      </div>

      {/* Nav Links */}
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li><NavLink to="/Dashboard" className="nav-links" onClick={handleClick}>Dashboard</NavLink></li>
        <li><NavLink to="/Performance" className="nav-links" onClick={handleClick}>Performance</NavLink></li>
        <li><NavLink to="/Analysis" className="nav-links" onClick={handleClick}>Analysis</NavLink></li>
        <li><NavLink to="/Recommendations" className="nav-links" onClick={handleClick}>Recommendations</NavLink></li>
        
       
      </ul>

      {/* Logout shows on the far right on desktop */}
      <div className="nav-logout-desktop">
        <button onClick={logout} className="logout-btn">
          Logout <FaSignOutAlt />
        </button>
      </div>
      
    </nav>
  );
};

export default Navbar;
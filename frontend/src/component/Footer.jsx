// Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import "../css/Footer.css"; // your footer CSS

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="dashboard-footer">
         <div className="footer-links">
           <button onClick={(onClick) => navigate("/About")}>About Us</button>
           <button onClick={(onClick) => navigate("/Contact")}>Contact</button>
           <button onClick={(onClick) => navigate("/Privacy_policy")}>Privacy Policy</button>
           <button onClick={(onClick) => navigate("/Terms")}>Terms of Service</button>
           <button onClick={(onClick) => navigate("/Career")}>Careers</button>
         </div>
      
   {/* SOCIALS */}
   <div className="footer-col">
     <h3>Follow Us</h3>
     <div className="footer-socials">
       <a href="#" aria-label="Instagram"><FaInstagram /></a>
       <a href="#" aria-label="Twitter"><FaTwitter /></a>
       <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
       <a href="#" aria-label="Facebook"><FaFacebook /></a>
     </div>
   </div>
   
           
           <p>&copy; 2026 SmartCrick. All rights reserved.</p>
         </footer>
  );
};

export default Footer;

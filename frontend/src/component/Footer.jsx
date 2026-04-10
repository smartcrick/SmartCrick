import { useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

import "../css/Footer.css";

const footerLinks = [
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Careers", path: "/career" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="dashboard-footer">
      <div className="footer-links">
        {footerLinks.map((link) => (
          <button key={link.path} onClick={() => navigate(link.path)} type="button">
            {link.label}
          </button>
        ))}
      </div>

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

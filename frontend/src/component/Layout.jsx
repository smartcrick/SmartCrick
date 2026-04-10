import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./SideBar.jsx";
import Footer from "./Footer.jsx";

import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Recommendations from "../pages/Recommendations.jsx";
import AddPerformance from "../pages/AddPerformance.jsx";
import Analysis from "../pages/Analysis.jsx";
import Dashboard from "../pages/Dashboard.jsx";

import About from "../pages/Footer/About.jsx";
import Career from "../pages/Footer/Career.jsx";
import Contact from "../pages/Footer/Contact.jsx";
import Terms from "../pages/Footer/Terms.jsx";
import Privacy_policy from "../pages/Footer/Privacy_policy.jsx";

import "../css/layout.css";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const location = useLocation();
  const contentRef = useRef(null);

  // Scroll to top on route change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname]);

  return (
    <div className="main-layout-container">
      {/* NAVBAR */}
      <Navbar />

      {/* BODY */}
      <div className="body-wrapper">
        {/* SIDEBAR */}
        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : "closed"}`}>
          <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        </div>

        
{/* SCROLLABLE CONTENT */}
<div
  ref={contentRef}
  className="content-wrapper"
>
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/recommendations" element={<Recommendations />} />
    <Route path="/performance" element={<AddPerformance />} />
    <Route path="/analysis" element={<Analysis />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/about" element={<About />} />
    <Route path="/career" element={<Career />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy_policy" element={<Privacy_policy />} />
  </Routes>

  {/* FOOTER (shared across all pages) */}
  <Footer />




        </div>
      </div>
    </div>
  );
}

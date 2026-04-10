import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Navbar from "./Navbar.jsx";
import Sidebar from "./SideBar.jsx";
import Footer from "./Footer.jsx";

import "../css/layout.css";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();
  const contentRef = useRef(null);

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
      <Navbar />

      <div className="body-wrapper">
        <div
          className={`sidebar-wrapper ${isSidebarOpen ? "open" : "closed"}`}
          onMouseEnter={() => setIsSidebarOpen(true)}
          onMouseLeave={() => setIsSidebarOpen(false)}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        <div ref={contentRef} className="content-wrapper">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

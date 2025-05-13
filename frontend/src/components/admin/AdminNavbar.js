// src/components/AdminNavbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const getLinkStyle = (index, isDashboard = false) => ({
    color: "white",
    textDecoration: "none",
    fontWeight: "700", // Increased font weight
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    fontSize: "0.95rem",
    letterSpacing: "0.5px",
    textTransform: "uppercase", // Make text uppercase
    backgroundColor: hoveredLink === index ? "rgba(255,255,255,0.1)" : isDashboard ? "rgba(255,255,255,0.1)" : "transparent",
    border: isDashboard ? "1px solid rgba(255,255,255,0.2)" : "none",
    transition: "all 0.3s ease",
    transform: hoveredLink === index ? "translateY(-2px)" : "none",
  });

  const navStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    padding: "0.8rem 2rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    flexWrap: "wrap",
  };

  const navLeftStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
  };

  const logoStyle = {
    height: "45px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
  };

  const navRightStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const contentStyle = {
    marginTop: "60px", // Reduced from 80px
    padding: "1rem", // Reduced from 2rem
  };

  return (
    <div>
      <nav style={navStyle}>
        <div style={navLeftStyle}>
          <img
            src="/logo.jpg"
            alt="Logo"
            style={logoStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          {[
            ["CATEGORY PAGE", "/admin/categorypage"],
            ["EDIT ITEMS", "/admin/edit-items"],
            ["STOCK LIST", "/admin/stock-list"],
            ["BY BRAND", "/admin/ByBrand"]
          ].map(([label, path], index) => (
            <Link
              key={index}
              to={path}
              style={getLinkStyle(index)}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {label}
            </Link>
          ))}
        </div>
        <div style={navRightStyle}>
          <Link
            to="/admin/AdminDashboard"
            style={getLinkStyle("dashboard", true)}
            onMouseEnter={() => setHoveredLink("dashboard")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            ADMIN DASHBOARD
          </Link>
        </div>
      </nav>  
      <div style={contentStyle}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default AdminNavbar;

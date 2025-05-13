// src/components/AdminNavbar.js
import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div>
      <nav style={navStyle}>
        <div style={navLeftStyle}>
          <img src="/logo.jpg" alt="Logo" style={logoStyle} />
          <Link to="/admin/categorypage" style={linkStyle}>Category Page</Link>
          <Link to="/admin/edit-items" style={linkStyle}>Edit Items</Link>
          <Link to="/admin/stock-list" style={linkStyle}>Stock List</Link>
          <Link to="/admin/ByBrand" style={linkStyle}>By Brand</Link>
        </div>
        <div style={navRightStyle}>
          <Link to="/admin/AdminDashboard" style={linkStyle}>Admin Dashboard</Link>
        </div>
      </nav>
      <div style={contentStyle}>
        {/* Your main content will go here */}
      </div>
    </div>
  );
};

const navStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  backgroundColor: "#333",
  color: "white",
  padding: "1rem",
  zIndex: 1000,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)"
};

const navLeftStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px"
};

const logoStyle = {
  height: "50px"
};

const navRightStyle = {
  marginRight: "20px"
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "10px 15px",
  borderRadius: "5px",
  transition: "all 0.3s ease"
};

const contentStyle = {
  marginTop: "80px", // Ensures the content is not hidden behind the navbar
};

const linkHoverStyle = {
  color: "#3498db", // Change to highlight color when hovered
  backgroundColor: "#2c3e50"
};

// Adding hover effects on links using JavaScript (for dynamic interaction)
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', (e) => {
    e.target.style.color = linkHoverStyle.color;
    e.target.style.backgroundColor = linkHoverStyle.backgroundColor;
  });
  link.addEventListener('mouseleave', (e) => {
    e.target.style.color = linkStyle.color;
    e.target.style.backgroundColor = '';
  });
});

export default AdminNavbar;

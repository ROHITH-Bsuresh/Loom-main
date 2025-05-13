import React from "react";
import AdminNavbar from "./AdminNavbar";

const AdminHome = () => {
  return (
    <div style={{ backgroundColor: "#e6f0ff", minHeight: "100vh" }}>
      <AdminNavbar />

      <div style={mainContentStyle}>
        <h1 style={headingStyle}>SRI MARIAMMAN TRADERS</h1>
        <h1 style={headingStyle}>Welcome to the Admin Dashboard</h1>
        <p style={descriptionStyle}>
          This is a Spare Parts Stock Management Website. Here you can manage stock details, products, and orders effectively.
        </p>

        <div style={imageContainerStyle}>
          <img src="/home/1.jpg" alt="Admin Home" style={imageStyle} />
        </div>
      </div>
    </div>
  );
};

const mainContentStyle = {
  padding: "60px 20px",
  textAlign: "center",
  color: "#003366",
};

const headingStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "15px",
};

const descriptionStyle = {
  fontSize: "1.2rem",
  marginBottom: "40px",
};

const imageContainerStyle = {
  maxWidth: "100%",
  margin: "0 auto",
  overflow: "hidden",
};

const imageStyle = {
  width: "100%",
  maxHeight: "500px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "30px",
};

export default AdminHome;

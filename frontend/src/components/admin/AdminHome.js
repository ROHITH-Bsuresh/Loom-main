import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import LowStockAlert from "./LowStockAlert";

const AdminHome = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    checkLowStock();
  }, []);

  const checkLowStock = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      const lowStock = response.data.filter(product => product.qty < 15)
        .map(product => ({
          name: product.name,
          qty: product.qty
        }));
      
      if (lowStock.length > 0) {
        setLowStockItems(lowStock);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error checking low stock:', error);
    }
  };

  return (
    <div style={{ backgroundColor: "#e6f0ff", minHeight: "100vh" }}>
      <AdminNavbar />
      
      {showAlert && (
        <LowStockAlert 
          lowStockItems={lowStockItems}
          onClose={() => setShowAlert(false)}
        />
      )}

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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = ({ lowStockItems }) => {
  const [newOrders, setNewOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [stockItems, setStockItems] = useState(350);

  useEffect(() => {
    const countTo = (target, setter) => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < target) {
          count += 1;
          setter(count);
        } else {
          clearInterval(interval);
        }
      }, 50);
    };

    countTo(5, setNewOrders);
    countTo(1, setPendingOrders);
    countTo(350, setStockItems);
  }, []);

  const fadeIn = { animation: "fadeIn 1.5s ease-in-out" };

  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#333",
    color: "white",
    padding: "60px",
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const logoStyle = {
    width: "120px",
    marginBottom: "10px"
  };

  const sidebarLink = {
    color: "white",
    textDecoration: "none",
    marginBottom: "15px",
    fontSize: "1.2rem",
    fontWeight: "bold"
  };

  const mainContentStyle = {
    marginLeft: "270px",
    padding: "50px",
    width: "100%"
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px"
  };

  const descriptionStyle = {
    fontSize: "1.2rem",
    marginBottom: "30px"
  };

  const statsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginTop: "20px"
  };

  const cardStyle = {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
    ...fadeIn
  };

  const sectionContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "40px"
  };

  const sectionStyle = {
    backgroundColor: "#eee",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center"
  };

  const buttonStyle = {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px"
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <img src="logo.jpg" alt="Logo" style={logoStyle} />
        <Link to="/admin/categorypage" style={sidebarLink}>Category Page</Link>
        <Link to="/admin/edit-items" style={sidebarLink}>Edit Items</Link>
        <Link to="/admin/stock-list" style={sidebarLink}>Stock List</Link>
      </aside>

      {/* Main Content */}
      <div style={mainContentStyle}>
        <h1 style={headingStyle}>Admin Dashboard</h1>
        <p style={descriptionStyle}>Monitor and manage all stock and orders efficiently.</p>

        {/* Dashboard Stats */}
        <div style={statsContainer}>
          <div style={cardStyle}>
            <h3>New Orders</h3>
            <p>{newOrders}</p>
          </div>
          <div style={cardStyle}>
            <h3>Pending Orders</h3>
            <p>{pendingOrders}</p>
          </div>
          <div style={cardStyle}>
            <h3>Stock Availability</h3>
            <p>{stockItems}+ Items</p>
          </div>
          <div style={cardStyle}>
            <h3>Low Stock Alerts</h3>
            <p>{lowStockItems} Items</p>
          </div>
        </div>

        {/* Management Sections */}
        <div style={sectionContainer}>
          <div style={sectionStyle}>
            <h2>Orders</h2>
            <p>View and process all incoming orders.</p>
            <Link to="/admin/orders" style={buttonStyle}>Manage Orders</Link>
          </div>
          <div style={sectionStyle}>
            <h2>Requirements</h2>
            <p>Check pending stock requests and requirements.</p>
            <Link to="/admin/RequirementPage" style={buttonStyle}>View Requirements</Link>
          </div>
          <div style={sectionStyle}>
            <h2>Manage Data</h2>
            <p>Update stock details, pricing, and product categories.</p>
            <Link to="/admin/manage" style={buttonStyle}>Go to Data Management</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

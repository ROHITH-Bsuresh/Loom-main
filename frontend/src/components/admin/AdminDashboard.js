import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all orders count
      const ordersResponse = await axios.get('http://localhost:5000/api/orders');
      setTotalOrders(ordersResponse.data.length);

      // Fetch pending orders count
      const pendingOrdersCount = ordersResponse.data.filter(
        order => order.status === 'pending'
      ).length;
      setPendingOrders(pendingOrdersCount);

      // Fetch total stock quantity
      const productsResponse = await axios.get('http://localhost:5000/api/products');
      const totalQty = productsResponse.data.reduce(
        (sum, product) => sum + product.qty, 
        0
      );
      setTotalStock(totalQty);

      // Fetch low stock items count
      const lowStockItems = productsResponse.data.filter(
        product => product.qty < 15
      ).length;
      setLowStockCount(lowStockItems);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <img src="logo.jpg" alt="Logo" className="dashboard-logo" />
        <Link to="/admin/categorypage" className="sidebar-link">Category Page</Link>
        <Link to="/admin/edit-items" className="sidebar-link">Edit Items</Link>
        <Link to="/admin/stock-list" className="sidebar-link">Stock List</Link>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Monitor and manage all stock and orders efficiently.</p>
        </header>

        <div className="stats-grid">
          <div className="stats-card">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
          <div className="stats-card">
            <h3>Pending Orders</h3>
            <p>{pendingOrders}</p>
          </div>
          <div className="stats-card">
            <h3>Stock Availability</h3>
            <p>{totalStock} Units</p>
          </div>
          <div className="stats-card">
            <h3>Low Stock Alerts</h3>
            <p>{lowStockCount} Items</p>
          </div>
        </div>

        <div className="management-grid">
          <div className="management-card">
            <h2>Orders</h2>
            <p>View and process all incoming orders.</p>
            <Link to="/admin/all-orders" className="dashboard-button">View All Orders</Link>
          </div>
          <div className="management-card">
            <h2>Requirements</h2>
            <p>Check pending stock requests and requirements.</p>
            <Link to="/admin/RequirementPage" className="dashboard-button">View Requirements</Link>
          </div>
          <div className="management-card">
            <h2>Manage Data</h2>
            <p>Update stock details, pricing, and product categories.</p>
            <Link to="/admin/manage" className="dashboard-button">Go to Data Management</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

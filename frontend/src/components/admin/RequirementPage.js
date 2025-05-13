import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RequirementPage.css";

const RequirementPage = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products and orders
      const [productsResponse, ordersResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/orders')
      ]);

      // Get pending orders
      const pendingOrders = ordersResponse.data.filter(order => order.status === 'pending');
      setPendingOrders(pendingOrders);

      // Get products with low stock that don't have pending orders
      const pendingProductIds = pendingOrders.map(order => order.productId);
      const lowStock = productsResponse.data.filter(product => 
        product.qty < 15 && !pendingProductIds.includes(product._id)
      );
      setLowStockItems(lowStock);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMakeOrder = (productId) => {
    navigate(`/admin/order/${productId}`);
  };

  const handleManageData = () => {
    navigate('/admin/manage');
  };

  return (
    <div className="requirement-page">
      <h2>Stock Requirements and Pending Orders</h2>
      
      <div className="table-container">
        <table className="requirement-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Current Qty</th>
              <th>Price</th>
              <th>Material</th>
              <th>Color</th>
              <th>Length</th>
              <th>Brand</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Low Stock Items */}
            {lowStockItems.map((item) => (
              <tr key={item._id} className={item.qty <= 5 ? 'critical-stock' : 'low-stock'}>
                <td>{item.name}</td>
                <td className="qty-cell">{item.qty} units</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>{item.material}</td>
                <td>{item.color}</td>
                <td>{item.length}</td>
                <td>{item.brand}</td>
                <td>
                  <button 
                    className="order-button"
                    onClick={() => handleMakeOrder(item._id)}
                  >
                    Make Order
                  </button>
                </td>
              </tr>
            ))}

            {/* Pending Orders */}
            {pendingOrders.map((order) => (
              <tr key={order._id} className="pending-row">
                <td>{order.productName}</td>
                <td className="qty-cell">Order: {order.orderQuantity} units</td>
                <td>₹{order.pricePerUnit.toFixed(2)}</td>
                <td>{order.material}</td>
                <td>{order.color}</td>
                <td>{order.length}</td>
                <td>{order.brand}</td>
                <td>
                  <div className="action-buttons">
                    <span className="pending-status">
                      Pending
                    </span>
                    <button 
                      className="manage-button"
                      onClick={handleManageData}
                    >
                      Manage Data
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequirementPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllOrders.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="all-orders-page">
      <button className="back-button" onClick={() => navigate('/admin/admindashboard')}>
        <FaArrowLeft /> Back to Dashboard
      </button>

      <h2>All Orders History</h2>
      
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Material</th>
              <th>Color</th>
              <th>Length</th>
              <th>Quantity</th>
              <th>Price/Unit</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className={order.status === 'pending' ? 'pending-row' : 'completed-row'}>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.productName}</td>
                <td>{order.brand}</td>
                <td>{order.material}</td>
                <td>{order.color}</td>
                <td>{order.length}</td>
                <td>{order.orderQuantity}</td>
                <td>₹{order.pricePerUnit}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Manage.css";

const Manage = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      const pending = response.data.filter(order => order.status === 'pending');
      setPendingOrders(pending);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    }
  };

  const handleReceived = async (order) => {
    try {
      // First, get the current product details
      const productResponse = await axios.get(`http://localhost:5000/api/product/${order.productId}`);
      const currentProduct = productResponse.data;

      // Calculate new quantity and amount
      const newQty = currentProduct.qty + order.orderQuantity;
      const newAmount = newQty * currentProduct.price;

      // Update product with new quantity and amount
      await axios.post(`http://localhost:5000/api/product`, {
        _id: order.productId,
        name: currentProduct.name,
        price: currentProduct.price,
        qty: newQty,
        amount: newAmount,
        image: currentProduct.image,
        length: currentProduct.length,
        brand: currentProduct.brand,
        material: currentProduct.material,
        finishing: currentProduct.finishing,
        usage: currentProduct.usage,
        color: currentProduct.color
      });

      // Update order status to completed
      await axios.put(`http://localhost:5000/api/orders/${order._id}`, {
        status: 'completed'
      });

      // Refresh the pending orders list
      await fetchPendingOrders();

      // Show success message
      alert(`Order received successfully! Added ${order.orderQuantity} units to inventory.`);

    } catch (error) {
      console.error('Error processing received order:', error);
      alert('Failed to process received order. Please try again.');
    }
  };

  return (
    <div className="manage-page">
      <h2>Pending Orders Management</h2>
      
      <div className="table-container">
        <table className="manage-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Material</th>
              <th>Color</th>
              <th>Length</th>
              <th>Order Quantity</th>
              <th>Price Per Unit</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.productName}</td>
                <td>{order.brand}</td>
                <td>{order.material}</td>
                <td>{order.color}</td>
                <td>{order.length}</td>
                <td>{order.orderQuantity}</td>
                <td>₹{order.pricePerUnit}</td>
                <td>₹{order.totalAmount}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="received-button"
                    onClick={() => handleReceived(order)}
                  >
                    Received
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manage;
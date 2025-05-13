import React from 'react';
import './LowStockAlert.css';

const LowStockAlert = ({ lowStockItems, onClose }) => {
  if (!lowStockItems || lowStockItems.length === 0) return null;

  return (
    <div className="low-stock-alert">
      <div className="alert-header">
        <h3>Low Stock Alert!</h3>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div>
      <div className="alert-content">
        {lowStockItems.map((item, index) => (
          <div key={index} className="alert-item">
            <span className="product-name">{item.name}</span>
            <span className="stock-count">Only {item.qty} units left</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import "./Order.css";

const Order = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [orderQty, setOrderQty] = useState(0);

  const brandPhoneNumbers = {
    'SMT': '7904623774',
    'MAYOOR': '8220657970',
    'TMTEX': '7339070456'
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/product/${productId}`);
      setProduct(response.data);
      setOrderQty(15 - response.data.qty);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleWhatsAppOrder = async (e) => {
    e.preventDefault();
    
    if (!product) return;

    try {
      // First save the order to database with all product details
      const orderData = {
        productId: product._id,
        productName: product.name,
        brand: product.brand,
        material: product.material,   // Included
        color: product.color,         // Included
        length: product.length,       // Included
        orderQuantity: orderQty,
        pricePerUnit: product.price,
        totalAmount: orderQty * product.price
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData);

      if (response.data.success) {
        // Then send WhatsApp message
        const phoneNumber = brandPhoneNumbers[product.brand] || '9787177299';
        const message = 
          `*New Order Request*\n\n` +
          `Product Details:\n` +
          `----------------\n` +
          `Name: ${product.name}\n` +
          `Brand: ${product.brand}\n` +
          `Material: ${product.material}\n` +
          `Color: ${product.color}\n` +
          `Length: ${product.length}\n\n` +
          `Order Details:\n` +
          `-------------\n` +
          `Current Stock: ${product.qty} units\n` +
          `Order Quantity: ${orderQty} units\n` +
          `Price per unit: ₹${product.price}\n` +
          `Total Amount: ₹${(orderQty * product.price).toFixed(2)}\n\n` +
          `Please process this order request. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        // Show success message and navigate back
        alert('Order has been saved and WhatsApp message is ready to send!');
        navigate('/admin/requirementpage');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again.');
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="order-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Requirements
      </button>

      <div className="order-card">
        <h2>Place Order</h2>
        
        <div className="product-details">
          <h3>{product.name}</h3>
          
          <div className="details-grid">
            <div className="detail-item">
              <label>Brand:</label>
              <span>{product.brand}</span>
            </div>
            <div className="detail-item">
              <label>Material:</label>
              <span>{product.material}</span>
            </div>
            <div className="detail-item">
              <label>Color:</label>
              <span>{product.color}</span>
            </div>
            <div className="detail-item">
              <label>Length:</label>
              <span>{product.length}</span>
            </div>
          </div>
        </div>

        <div className="order-form-container">
          <form onSubmit={handleWhatsAppOrder}>
            <div className="stock-info">
              <div className="current-stock">
                <label>Current Stock:</label>
                <span className={product.qty < 5 ? 'critical' : 'low'}>
                  {product.qty} units
                </span>
              </div>
              <div className="unit-price">
                <label>Price per unit:</label>
                <span>₹{product.price}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Order Quantity:</label>
              <input
                type="number"
                min="1"
                value={orderQty}
                onChange={(e) => setOrderQty(parseInt(e.target.value))}
                required
              />
            </div>

            <div className="total-amount">
              <label>Total Amount:</label>
              <span>₹{(orderQty * product.price).toFixed(2)}</span>
            </div>

            <button type="submit" className="whatsapp-order-button">
              <FaWhatsapp /> Send Order on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
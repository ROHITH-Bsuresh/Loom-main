// src/pages/CategoryDetailsPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './CategoryDetailsPage.css';

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/product/${id}`);
      setProd(res.data);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError("Failed to load product details");
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!prod) return <p className="loading-message">Loading...</p>;

  // Get image URL from the product path stored in database
  const imageUrl = prod.image.startsWith('product/') 
    ? `${process.env.PUBLIC_URL}/${prod.image}`
    : `${process.env.PUBLIC_URL}/product/${prod.image}`;

  return (
    <div className="category-details">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="product-card">
        <h2 className="product-title">{prod.name}</h2>

        <div className="image-container">
          <img 
            src={imageUrl} 
            alt={prod.name} 
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              const fallbackImage = `${process.env.PUBLIC_URL}/product/unnamed.png`;
              if (e.target.src !== fallbackImage) {
                console.error('Failed to load image:', prod.image);
                e.target.src = fallbackImage;
              }
            }}
          />
        </div>

        <div className="details-container">
          <DetailItem label="Price" value={`₹${prod.price.toLocaleString()}`} />
          <DetailItem label="Brand" value={prod.brand} />
          <DetailItem label="Material" value={prod.material} />
          <DetailItem label="Length" value={prod.length} />
          <DetailItem label="Usage" value={prod.usage} />
          <DetailItem label="Finishing" value={prod.finishing} />
          <DetailItem label="Color" value={prod.color} />
          <DetailItem label="Available Stock" value={`${prod.qty} units`} />
          <DetailItem label="Total Amount" value={`₹${prod.amount.toLocaleString()}`} />
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <div className="detail-label">{label}</div>
    <div className="detail-value">{value}</div>
  </div>
);

export default CategoryDetailsPage;

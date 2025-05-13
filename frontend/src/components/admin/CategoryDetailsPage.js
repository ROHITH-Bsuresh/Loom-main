// src/pages/CategoryDetailsPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${id}`)
      .then(res => setProd(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!prod) return <p style={loadingStyle}>Loading…</p>;

  const imageUrl = `http://localhost:5000/${prod.image}`;

  return (
    <div style={pageStyle}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        ← Back
      </button>

      <div style={cardStyle}>
        <h2 style={headingStyle}>{prod.name}</h2>

        {/* Image */}
        <div style={imageContainerStyle}>
          <img src={imageUrl} alt={prod.name} style={imageStyle} />
        </div>

        {/* Details */}
        <div style={detailsContainer}>
          <Detail label="Price" value={`₹${prod.price}`} />
          <Detail label="Brand" value={prod.brand} />
          <Detail label="Material" value={prod.material} />
          <Detail label="Color" value={prod.color} />
          <Detail label="Length" value={prod.length} />
          <Detail label="Usage" value={prod.usage} />
          <Detail label="Finishing" value={prod.finishing} />
          <Detail label="Quantity" value={prod.qty} />
        </div>
      </div>
    </div>
  );
};

// Reusable component
const Detail = ({ label, value }) => (
  <p style={detailItem}><strong>{label}:</strong> {value}</p>
);

// Styles
const loadingStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "20px",
  color: "#555"
};

const pageStyle = {
  padding: "40px 20px",
  maxWidth: "700px",
  margin: "auto",
  animation: "fadeIn 1s ease-in-out"
};

const backButtonStyle = {
  marginBottom: "30px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#343a40",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s"
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  animation: "slideIn 0.7s ease-out"
};

const headingStyle = {
  textAlign: "center",
  color: "#333",
  marginBottom: "20px"
};

const imageContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px"
};

const imageStyle = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: "10px",
  border: "1px solid #ddd",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
};

const detailsContainer = {
  marginTop: "10px"
};

const detailItem = {
  margin: "8px 0",
  fontSize: "16px",
  color: "#444",
  transition: "color 0.2s",
};

export default CategoryDetailsPage;

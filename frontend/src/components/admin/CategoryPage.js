// src/pages/CategoryPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './CategoryPage.css'; // Import the CSS file

const CategoryPage = () => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch all products
    axios.get("http://localhost:5000/api/products")
      .then(res => setMaterials(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleClick = (id) => {
    navigate(`/admin/CategoryDetailsPage/${id}`);
  };

  return (
    <div className="brand-page">
      <div className="brand-header">
        <h2>All Materials</h2>
      </div>
      <div className="product-grid">
        {materials.map(mat => (
          <div
            key={mat._id}
            className="product-card"
            onClick={() => handleClick(mat._id)}
          >
            <div className="product-card-inner">
              <div className="product-name">{mat.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

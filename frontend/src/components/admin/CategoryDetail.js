import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CategoryDetail() {
  const { id } = useParams(); // material type
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = allProducts.filter(p => p.materialType === id);
    setProducts(filtered);
  }, [id]);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Products with Material Type: <strong>{id}</strong></h2>
      {products.length > 0 ? (
        <ul>
          {products.map((p, index) => (
            <li key={index}>{p.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found for this material type.</p>
      )}
    </div>
  );
}

export default CategoryDetail;

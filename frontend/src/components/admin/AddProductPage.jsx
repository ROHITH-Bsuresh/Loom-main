import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    dimension: "",
    colour: "",
    quality: "",
    materialtype: "",
    leastCount: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedBrands = JSON.parse(localStorage.getItem("brands")) || [];
    const brand = storedBrands.find((b) => b.name === brandName);
    if (brand) setProducts(brand.products);
  }, [brandName]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    const storedBrands = JSON.parse(localStorage.getItem("brands")) || [];
    const updatedBrands = storedBrands.map((b) =>
      b.name === brandName
        ? { ...b, products: [...b.products, product] }
        : b
    );
    localStorage.setItem("brands", JSON.stringify(updatedBrands));
    setProducts([...products, product]);
    setProduct({
      name: "",
      dimension: "",
      colour: "",
      quality: "",
      materialtype: "",
      leastCount: "",
    });
  };

  return (
    <div style={pageStyle}>
      <h2>{brandName} - Add Product</h2>

      <div style={formCardStyle}>
        {["name", "dimension", "colour", "quality", "materialtype", "leastCount"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={product[field]}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}
        <button onClick={handleAddProduct} style={buttonStyle}>Add Product</button>
        <button onClick={() => navigate("/admin/ByBrand")} style={backButtonStyle}>Back</button>
      </div>

      <h3>Products List</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dimension</th>
            <th>Colour</th>
            <th>Quality</th>
            <th>Material Type</th>
            <th>Least Count</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, i) => (
            <tr key={i}>
              <td>{prod.name}</td>
              <td>{prod.dimension}</td>
              <td>{prod.colour}</td>
              <td>{prod.quality}</td>
              <td>{prod.materialtype}</td>
              <td>{prod.leastCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const pageStyle = {
  textAlign: "center",
  padding: "40px",
};

const formCardStyle = {
  margin: "0 auto",
  padding: "20px",
  background: "#f8f8f8",
  borderRadius: "10px",
  maxWidth: "400px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const backButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#6c757d",
};

const tableStyle = {
  width: "90%",
  margin: "20px auto",
  borderCollapse: "collapse",
};

export default AddProductPage;

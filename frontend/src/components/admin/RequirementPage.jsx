import React, { useState } from "react";

const RequirementPage = ({ setLowStockItemsList }) => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");

  const handleAddProduct = () => {
    if (name && stock && parseInt(stock) < 10) {
      const newProduct = { name, stock: parseInt(stock) };
      setLowStockItemsList(prev => [...prev, newProduct]);
      setName("");
      setStock("");
    } else {
      alert("Stock must be less than 10 to be considered low stock.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Add Low Stock Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <button onClick={handleAddProduct} style={{ marginLeft: "10px" }}>
        Add
      </button>
    </div>
  );
};

export default RequirementPage;

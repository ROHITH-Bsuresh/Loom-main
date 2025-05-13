import React, { useState } from 'react';
import StockList from './StockList';
import EditItems from './EditItems';
import AdminNavbar from "./AdminNavbar"; // Adjust path if needed

const ManageStock = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', stock: 50 },
    { id: 2, name: 'Product B', stock: 20 },
  ]);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    console.log("Updated Products:", products); // This will log old state due to async update
  };

  return (
    <div style={{ padding: '20px' }}>
      <AdminNavbar />
      <h1 style={{ textAlign: 'center' }}>Manage Stock</h1>
      <EditItems addProduct={addProduct} />
      <StockList products={products} />
    </div>
  );
};

export default ManageStock;

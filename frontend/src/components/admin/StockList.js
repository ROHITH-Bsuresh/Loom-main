import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockList.css';

function StockList() {
  const [products, setProducts] = useState([]); // Will store full product objects
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    date: '',
    productName: '',
    soldQty: 0,
    soldPrice: 0,
    total: 0
  });
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    }
  };

  const fetchSales = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sales');
      setSales(res.data);
    } catch (err) {
      setError('Failed to fetch sales');
      console.error(err);
    }
  };

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const selected = products.find(p => p._id === productId);
    setSelectedProduct(selected);
    
    setForm(prev => ({
      ...prev,
      productName: selected ? selected.name : '',
      soldPrice: selected ? selected.price : 0,
      total: selected ? selected.price * prev.soldQty : 0
    }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    
    // Calculate total when quantity changes
    if (name === 'soldQty') {
      updatedForm.total = parseFloat(value || 0) * parseFloat(form.soldPrice || 0);
    }
    
    setForm(updatedForm);
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!selectedProduct) {
      setError('Please select a product');
      return;
    }

    if (selectedProduct.qty < form.soldQty) {
      setError(`Only ${selectedProduct.qty} units available in stock`);
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/sales', form);
      setForm({ date: '', productName: '', soldQty: 0, soldPrice: 0, total: 0 });
      setSelectedProduct(null);
      fetchSales();
      fetchProducts(); // Refresh products to get updated quantities
      setError('');
      alert('Sale recorded successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record sale');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="stock-list-container">
      <h2>Stock Sale Entry</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="sale-form">
        <div className="form-group">
          <label>Date:</label>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Product:</label>
          <select 
            value={selectedProduct?._id || ''} 
            onChange={handleProductSelect} 
            required
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.brand} ({product.qty} in stock)
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && (
          <div className="product-details">
            <p>Brand: {selectedProduct.brand}</p>
            <p>Material: {selectedProduct.material}</p>
            <p>Length: {selectedProduct.length}</p>
            <p>Available Stock: {selectedProduct.qty}</p>
          </div>
        )}

        <div className="form-group">
          <label>Quantity:</label>
          <input 
            type="number" 
            name="soldQty" 
            value={form.soldQty} 
            onChange={handleChange} 
            min="1"
            max={selectedProduct?.qty || 0}
            required 
          />
        </div>

        <div className="form-group">
          <label>Price per unit:</label>
          <input 
            type="number" 
            name="soldPrice" 
            value={form.soldPrice} 
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Total:</label>
          <input 
            type="number" 
            name="total" 
            value={form.total} 
            readOnly 
          />
        </div>

        <button type="submit" className="submit-button">
          Record Sale
        </button>
      </form>

      <div className="sales-table-container">
        <h3>Sales History</h3>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price/Unit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <td>{formatDate(sale.date)}</td>
                <td>{sale.productName}</td>
                <td>{sale.soldQty}</td>
                <td>₹{sale.soldPrice.toFixed(2)}</td>
                <td>₹{sale.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockList;

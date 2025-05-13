import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockList() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    date: '',
    productName: '',
    soldQty: 0,
    soldPrice: 0,
    total: 0
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/product-names')
      .then(res => setProducts(res.data))
      .catch(console.error);

    fetchSales();
  }, []);

  const fetchSales = () => {
    axios.get('http://localhost:5000/api/sales')
      .then(res => setSales(res.data))
      .catch(console.error);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    if (name === 'soldQty' || name === 'soldPrice') {
      updatedForm.total = updatedForm.soldQty * updatedForm.soldPrice;
    }
    setForm(updatedForm);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/sales', form);
      alert('Sale recorded successfully!');
      setForm({ date: '', productName: '', soldQty: 0, soldPrice: 0, total: 0 });
      fetchSales();
    } catch (err) {
      alert(err.response?.data?.message || 'Sale failed');
    }
  };

  return (
    <div>
      <h2>Stock Sale Entry</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <select name="productName" value={form.productName} onChange={handleChange} required>
          <option value="">Select Product</option>
          {products.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <input type="number" name="soldQty" value={form.soldQty} onChange={handleChange} placeholder="Sold Qty" required />
        <input type="number" name="soldPrice" value={form.soldPrice} onChange={handleChange} placeholder="Price per unit" required />
        <input type="number" name="total" value={form.total} readOnly />
        <button type="submit">Submit Sale</button>
      </form>

      <h3>Sales Table</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Sold Qty</th>
            <th>Sold Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, i) => (
            <tr key={i}>
              <td>{s.date}</td>
              <td>{s.productName}</td>
              <td>{s.soldQty}</td>
              <td>{s.soldPrice}</td>
              <td>{s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;

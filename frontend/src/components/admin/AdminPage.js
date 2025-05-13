import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import EditItems from './EditItems';
import StockList from './StockList';
import CategoryPage from './CategoryPage';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <nav className="navbar">
        <ul>
          <li><Link to ="CategoryPage">CategoryPage</Link></li>
          <li><Link to="edit-items">Edit Items</Link></li>
          <li><Link to="stock-list">Stock List</Link></li>
        </ul>
      </nav>

      <div className="content">
        <Routes>
        <Route path="CategoryPage" element={<CategoryPage />} />
          <Route path="edit-items" element={<EditItems />} />
          <Route path="stock-list" element={<StockList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;

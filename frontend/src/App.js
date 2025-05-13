import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./components/Login";
import AddProductPage from "./components/admin/AddProductPage";
import AdminHome from "./components/admin/AdminHome";
import AdminPage from "./components/admin/AdminPage";
import ManageStock from "./components/admin/ManageStock";
import EditItems from "./components/admin/EditItems";
import StockList from "./components/admin/StockList";
import CategoryPage from "./components/admin/CategoryPage";
import CategoryDetailsPage from "./components/admin/CategoryDetailsPage";

import CategoryDetail from "./components/admin/CategoryDetail";
import AdminDashboard from "./components/admin/AdminDashboard";
import ByBrand from "./components/admin/ByBrand";
import RequirementPage from "./components/admin/RequirementPage";
import AdminNavbar from "./components/admin/AdminNavbar";
import Order from './components/admin/Order';
import Manage from './components/admin/Manage';
import AllOrders from './components/admin/AllOrders';

import Home from "./components/user/Home";
import About from "./components/user/About";
import Contact from "./components/user/Contact";
import Product from "./components/user/Products";
import Navbar from "./components/user/Navbar";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const hideNavbarPaths = ["/"];

  const showAdminNavbar = userRole === "admin" && !hideNavbarPaths.includes(location.pathname);
  const showUserNavbar = userRole === "customer" && !hideNavbarPaths.includes(location.pathname);

  const [lowStockItemsList, setLowStockItemsList] = useState([]);

  return (
    <>
      {showAdminNavbar && <AdminNavbar />}
      {showUserNavbar && <Navbar />}

      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* User Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/RequirementPage"
          element={<RequirementPage setLowStockItemsList={setLowStockItemsList} />} />

        {/* Admin Routes */}
        <Route path="/add-product/:brandName" element={<AddProductPage />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/manage-stock" element={<ManageStock />} />
        <Route path="/admin/edit-items" element={<EditItems />} />
        <Route path="/admin/stock-list" element={<StockList />} />
        <Route path="/admin/categorypage" element={<CategoryPage />} />
        <Route path="/admin/CategoryDetailsPage/:id" element={<CategoryDetailsPage />} />  // Corrected path

        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/bybrand" element={<ByBrand />} />
        <Route path="/admin/requirementpage" element={<RequirementPage />} />
        <Route path="/admin/order/:productId" element={<Order />} />
        <Route path="/admin/manage" element={<Manage />} />
        <Route path="/admin/all-orders" element={<AllOrders />} />

      </Routes>
    </>
  );
}

export default App;

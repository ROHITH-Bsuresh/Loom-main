import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { Plus, Edit2, Trash2, Save, X, ImageIcon, Package, DollarSign, Hash, Layers, Briefcase, PenToolIcon as Tool, Compass, Target, Palette } from 'lucide-react';
import './EditStockList.css';

const EditStockList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [length, setLength] = useState('');
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('');
  const [finishing, setFinishing] = useState('');
  const [usage, setUsage] = useState('');
  const [color, setColor] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

const publicImages = [
    'product/loom eccentric or loom cam.png',
    'product/loom buffer or shuttle buffer.png',
    'product/wooden loom shuttle.png',
    'product/set spanner set.png',
    'product/adjustment spanner.png',
    'product/pipe wrench.png',
    'product/mesh filter.png',
    'product/loom reed filter.png',
    'product/power loom shuttle.png',
    'product/plastic bobbin.png',
    'product/shuttle bobbin.png',
    'product/mayoor shuttle.png',
    'product/loom hexagonal nut.png',
    'product/mesh washer.png',
    'product/carriage bolt.png',
    'product/only bolt.png',
    'product/carriage boly din 603.png',
    'product/picking lever.png',
    'product/gear wheel.png'
];


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
      showMessage('Failed to fetch products. Please try again.', 'error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleAddOrUpdate = async () => {
    if (!name || !price || !qty || !selectedImage) {
      showMessage('Please fill all required fields!', 'error');
      return;
    }

    const updatedProduct = {
      _id: editingId || null,
      name,
      price: parseFloat(price),
      qty: parseInt(qty),
      amount: parseFloat(price) * parseInt(qty),
      image: selectedImage,
      length,
      brand,
      material,
      finishing,
      usage,
      color,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/product', updatedProduct);

      if (response.data.success) {
        fetchProducts();
        showMessage(response.data.message, 'success');
        resetForm();
      } else {
        showMessage('Failed to add/update product. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error adding/updating product:', error);
      showMessage('Failed to add/update product. Please try again.', 'error');
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setQty('');
    setSelectedImage('');
    setLength('');
    setBrand('');
    setMaterial('');
    setFinishing('');
    setUsage('');
    setColor('');
    setEditingId(null);
    setIsFormVisible(false);
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setQty(product.qty);
    setSelectedImage(product.image);
    setLength(product.length || '');
    setBrand(product.brand || '');
    setMaterial(product.material || '');
    setFinishing(product.finishing || '');
    setUsage(product.usage || '');
    setColor(product.color || '');
    setEditingId(product._id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/product/${id}`);
        if (response.data.success) {
          fetchProducts();
          showMessage('Product deleted successfully', 'success');
        } else {
          showMessage('Failed to delete product', 'error');
        }
      } catch (error) {
        console.error('Error deleting product', error);
        showMessage('Error deleting product', 'error');
      }
    }
  };

  return (
    <div className="edit-stock-wrapper">
      <AdminNavbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Product Inventory Management</h1>
          <button 
            className="add-product-btn" 
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? (
              <>
                <X size={18} /> Cancel
              </>
            ) : (
              <>
                <Plus size={18} /> Add New Product
              </>
            )}
          </button>
        </div>

        {message && (
          <div className={`message-toast ${messageType}`}>
            {message}
          </div>
        )}

        {isFormVisible && (
          <div className="product-form-container">
            <div className="product-form-header">
              <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            </div>
            <div className="product-form">
              <div className="form-group">
                <label>
                  <Package size={16} />
                  Product Name*
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <DollarSign size={16} />
                    Price*
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Hash size={16} />
                    Quantity*
                  </label>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Layers size={16} />
                    Length
                  </label>
                  <input
                    type="text"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Enter length"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Briefcase size={16} />
                    Brand
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Enter brand"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Tool size={16} />
                    Material
                  </label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="Enter material"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Compass size={16} />
                    Finishing
                  </label>
                  <input
                    type="text"
                    value={finishing}
                    onChange={(e) => setFinishing(e.target.value)}
                    placeholder="Enter finishing"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Target size={16} />
                    Usage
                  </label>
                  <input
                    type="text"
                    value={usage}
                    onChange={(e) => setUsage(e.target.value)}
                    placeholder="Enter usage"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Palette size={16} />
                    Color
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Enter color"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <ImageIcon size={16} />
                    Image*
                  </label>
                  <select
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                    required
                  >
                    <option value="">Select an Image</option>
                    {publicImages.map((image, index) => (
                      <option key={index} value={image}>
                        {`Image ${index + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedImage && (
                <div className="image-preview-container">
                  <img
                    src={`/${selectedImage}`}
                    alt="Preview"
                    className="image-preview"
                  />
                </div>
              )}

              <div className="form-actions">
                <button 
                  className="save-btn" 
                  onClick={handleAddOrUpdate}
                >
                  <Save size={16} />
                  {editingId ? 'Update Product' : 'Save Product'}
                </button>
                <button 
                  className="cancel-btn" 
                  onClick={resetForm}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="products-container">
          <h2>Product Inventory</h2>
          <div className="table-responsive">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Specifications</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((prod) => (
                    <tr key={prod._id} className="product-row">
                      <td>
                        <div className="product-image-container">
                          <img
                            src={`/${prod.image}`}
                            alt={prod.name}
                            className="product-image"
                          />
                        </div>
                      </td>
                      <td className="product-name">{prod.name}</td>
                      <td>₹{prod.price.toFixed(2)}</td>
                      <td>{prod.qty}</td>
                      <td>₹{prod.amount.toFixed(2)}</td>
                      <td>
                        <div className="specs-container">
                          {prod.brand && <span className="spec-tag">Brand: {prod.brand}</span>}
                          {prod.material && <span className="spec-tag">Material: {prod.material}</span>}
                          {prod.color && <span className="spec-tag">Color: {prod.color}</span>}
                          {prod.length && <span className="spec-tag">Length: {prod.length}</span>}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="edit-btn" 
                            onClick={() => handleEdit(prod)}
                            title="Edit Product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            className="delete-btn" 
                            onClick={() => handleDelete(prod._id)}
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="no-products">
                      No products found. Add some products to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStockList;

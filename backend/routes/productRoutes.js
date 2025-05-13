const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add or update product
router.post('/product', async (req, res) => {
  const { _id, name, price, qty, amount, image, length, brand, material, finishing, usage, color } = req.body;

  try {
    if (_id) {
      // Update product
      await Product.findByIdAndUpdate(_id, { name, price, qty, amount, image, length, brand, material, finishing, usage, color });
      res.json({ success: true, message: 'Product updated successfully' });
    } else {
      // Add new product
      const newProduct = new Product({ name, price, qty, amount, image, length, brand, material, finishing, usage, color });
      await newProduct.save();
      res.json({ success: true, message: 'Product added successfully' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save product' });
  }
});

// Delete product
router.delete('/product/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public')); // Serves files like public/product/image.png


// Replace with your MongoDB URI
mongoose.connect('mongodb://localhost:27017/productDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes

// Get all products
// app.get('/api/products', async (req, res) => {
 // try {
  //  const products = await Product.find();
 //   res.json(products);
 // } catch (error) {
  //  res.status(500).json({ message: 'Error fetching products' });
//  }
// });

// Add or update a product
app.post('/api/product', async (req, res) => {
  const { _id, name, price, qty, amount, image, length, brand, material, finishing, usage, color } = req.body;

  try {
    if (_id) {
      // Update product
      await Product.findByIdAndUpdate(_id, {
        name, price, qty, amount, image, length, brand, material, finishing, usage, color
      });
      res.json({ success: true, message: 'Product updated successfully' });
    } else {
      // Add new product
      const newProduct = new Product({
        name, price, qty, amount, image, length, brand, material, finishing, usage, color
      });
      await newProduct.save();
      res.json({ success: true, message: 'Product added successfully' });
    }
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ success: false, message: 'Failed to save product' });
  }
});

// Delete a product
app.delete('/api/product/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

// Get a single product by id
app.get('/api/product/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Not found' });
    res.json(prod);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});


// Get products filtered by brand
app.get('/api/products', async (req, res) => {
  const { brand } = req.query; // Extract brand query parameter
  try {
    if (brand) {
      const products = await Product.find({ brand });
      res.json(products);
    } else {
      const products = await Product.find();
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

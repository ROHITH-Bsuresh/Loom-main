const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const Sale = require('./models/Sale');
const Order = require('./models/Order');

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

// Get product names for dropdown
app.get('/api/product-names', async (req, res) => {
  try {
    const products = await Product.find({}, 'name');
    const productNames = products.map(p => p.name);
    res.json(productNames);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product names' });
  }
});

// Record a sale and update inventory
app.post('/api/sales', async (req, res) => {
  const { date, productName, soldQty, soldPrice, total } = req.body;

  try {
    // Find the product
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if enough quantity is available
    if (product.qty < soldQty) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Create sale record
    const sale = new Sale({
      date,
      productName,
      soldQty,
      soldPrice,
      total
    });
    await sale.save();

    // Update product quantity
    product.qty -= soldQty;
    product.amount = product.qty * product.price;
    await product.save();

    res.json({ message: 'Sale recorded and inventory updated' });
  } catch (error) {
    console.error('Sale error:', error);
    res.status(500).json({ message: 'Failed to record sale' });
  }
});

// Get all sales
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales' });
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

// Get low stock products (less than 15 units)
app.get('/api/low-stock', async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ qty: { $lt: 15 } });
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock products' });
  }
});

// Update the order route to include all product details
app.post('/api/orders', async (req, res) => {
  try {
    const {
      productId,
      productName,
      brand,
      material,      // Added
      color,         // Added
      length,        // Added
      orderQuantity,
      pricePerUnit,
      totalAmount
    } = req.body;

    const newOrder = new Order({
      productId,
      productName,
      brand,
      material,      // Added
      color,         // Added
      length,        // Added
      orderQuantity,
      pricePerUnit,
      totalAmount
    });

    await newOrder.save();
    res.status(201).json({ 
      success: true, 
      message: 'Order saved successfully',
      order: newOrder 
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save order' 
    });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true, message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

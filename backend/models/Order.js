const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  orderQuantity: {
    type: Number,
    required: true
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
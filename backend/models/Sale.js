const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  soldQty: {
    type: Number,
    required: true
  },
  soldPrice: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sale', saleSchema);
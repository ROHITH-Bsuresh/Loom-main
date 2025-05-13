const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  length: {
    type: String, // You can change this to a Number if length is a numeric value
    required: false, // Optional field, you can set it to true if it's a required field
  },
  brand: {
    type: String,
    required: false, // Optional field
  },
  material: {
    type: String,
    required: false, // Optional field
  },
  finishing: {
    type: String,
    required: false, // Optional field
  },
  usage: {
    type: String,
    required: false, // Optional field
  },
  color: {
    type: String,
    required: false, // Optional field
  }

  
});

module.exports = mongoose.model('Product', productSchema);

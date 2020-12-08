const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  products: [
    {
      _id: { type: String },
      name: { type: String },
      price: { type: String },
      count: { type: String },
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);

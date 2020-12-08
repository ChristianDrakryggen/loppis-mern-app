const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("Address", AddressSchema);

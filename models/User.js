const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

//Runs before every save of a User to hash/encrypt password if password has changed
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHashed) => {
    if (err) {
      return next(err);
    }
    this.password = passwordHashed;
    next();
  });
});

//Gets called from passports local strategy to compare password submitted from client
UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    } else {
      if (!isMatch) {
        return callback(null, isMatch);
      }
      return callback(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);

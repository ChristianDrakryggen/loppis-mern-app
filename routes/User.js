const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Address = require("../models/Address");
const Product = require("../models/Product");
const Order = require("../models/Order");

/*---REGISTRATION, AUTHENTICATION & AUTHORIZATION---*/

//Function that creates our json we token (cookie)
const signToken = (userId) => {
  return jwt.sign(
    {
      iss: "Christian Johannesson",
      sub: userId,
    },
    "christianDrakryggen",
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

//Save a new user to db
userRouter.post("/user/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error occured", msgError: true } });
    }
    if (user) {
      res.status(400).json({
        message: { msgBody: "Username allready taken", msgError: true },
      });
    } else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err) {
          res
            .status(500)
            .json({ message: { msgBody: "An error occured", msgError: true } });
        } else {
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
        }
      });
    }
  });
});

//Runs local strategy middleware (passport.js file) and sets cookie to jwt created through our signToken() function
userRouter.post(
  "/user/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access-token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username },
        message: { msgBody: "Successfully logged in", msgError: false },
      });
    }
  }
);

//Runs jwt strategy middleware (passport.js file) to see if there is a session cookie (jwt) stored in our browser
userRouter.get(
  "/user/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { _id, username } });
  }
);

//Runs jwt strategy middleware (passport.js file) to see if there is a session cookie (jwt) stored in our browser, then clears cookie so user is no longer authenticated
userRouter.get(
  "/user/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access-token");
    res.json({ user: { username: "" }, success: true });
  }
);

/*---USERS AND ADDRESSES---*/

//Users
userRouter.get("/getallusers", (req, res) => {
  User.find({}).exec((err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "An error ocuurred", msgError: true } });
    } else {
      res.status(200).json({ users: user });
    }
  });
});

//Post new address after checking auth trough jwt-strategy
userRouter.post(
  "/user/newaddress",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const address = new Address(req.body);
    address.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: { msgBody: "An error ocuurred", msgError: true } });
      } else {
        User.findByIdAndUpdate(req.user._id, { address }, (err) => {
          if (err) {
            res.status(500).json({
              message: { msgBody: "An error ocuurred", msgError: true },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Successfully added address",
                msgError: false,
              },
              isAuthenticated: true,
            });
          }
        });
      }
    });
  }
);

//Gets address after checking auth trough jwt-strategy
userRouter.get(
  "/user/getaddress",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("address")
      .exec((err, user) => {
        if (err) {
          res.status(500).json({
            message: { msgBody: "An error ocuurred", msgError: true },
          });
        } else {
          res
            .status(200)
            .json({ address: user.address, isAuthenticated: true });
        }
      });
  }
);

/*---PRODUCTS AND ORDERS---*/

//Posts product to user after checking auth trough jwt-strategy
userRouter.post(
  "/user/newproduct",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const product = new Product(req.body);
    product.save((err) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "An error ocuurred", msgError: true },
        });
      } else {
        req.user.products.push(product);
        req.user.save((err) => {
          if (err) {
            res.status(500).json({
              message: { msgBody: "An error ocuurred", msgError: true },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Successfully added product",
                msgError: false,
              },
              isAuthenticated: true,
            });
          }
        });
      }
    });
  }
);

//Gets the loggedin users products after checking auth trough jwt-strategy
userRouter.get(
  "/user/getmyproducts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("products")
      .exec((err, user) => {
        if (err) {
          res.status(500).json({
            message: { msgBody: "An error ocuurred", msgError: true },
          });
        } else {
          res
            .status(200)
            .json({ products: user.products, isAuthenticated: true });
        }
      });
  }
);

//Gets products for user specified in request body
userRouter.post("/user/getproducts", (req, res) => {
  User.findById({ _id: req.body._id })
    .populate("products")
    .exec((err, user) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "An error ocuurred", msgError: true },
        });
      } else {
        res
          .status(200)
          .json({ username: user.username, products: user.products });
      }
    });
});

//Posts new order and saves it to user specified through req.body
userRouter.post("/user/neworder", (req, res) => {
  const order = new Order(req.body);
  order.save((err) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "An error ocuurred", msgError: true },
      });
    } else {
      User.findById({ _id: req.body.storeOwnerId }, (err, user) => {
        if (err) {
          res.status(500).json({
            message: { msgBody: "An error ocuurred", msgError: true },
          });
        } else {
          user.orders.push(order);
          user.save((err) => {
            if (err) {
              res.status(500).json({
                message: { msgBody: "An error ocuurred", msgError: true },
              });
            } else {
              res.status(200).json({
                message: {
                  msgBody: "Successfully created order",
                  msgError: false,
                },
              });
            }
          });
        }
      });
    }
  });
});

//Gets the loggedin users orders after checking auth through jwt strategy
userRouter.get(
  "/user/getorders",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("orders")
      .exec((err, user) => {
        if (err) {
          res.status(500).json({
            message: { msgBody: "An error ocuurred", msgError: true },
          });
        } else {
          res.status(200).json({ orders: user.orders, isAuthenticated: true });
        }
      });
  }
);

module.exports = userRouter;

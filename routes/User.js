const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

module.exports = userRouter;

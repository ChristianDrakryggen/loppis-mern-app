const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

//cookieExtractor to check for and retrieve stored cookie (jwt) in browser
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access-token"];
  }
  return token;
};

//Middleware that runs every time passports "jwt" flag is set as a param in our userRouters requesthadlers
passport.use(
  new jwtStrategy(
    { jwtFromRequest: cookieExtractor, secretOrKey: "christianDrakryggen" },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

//Middleware that runs every time passports "local" flag is set as a param in our userRouters requesthadlers
passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, done);
    });
  })
);

const { logger } = require("../utils/logger");
const passport = require("passport");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const options = {
  usernameField: "email",
  passwordField: "password",
};

const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(options, (email, password, done) => {
    User.findOne({ email }).then((user) => {
      logger.info(`${email} has sent a password request`);
      if (!user) {
        return done(null, "error");
      }
      bcryptjs
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err);
        });
    });
  })
);

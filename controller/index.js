require("dotenv").config;
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const HttpStatus = require("http-status-codes");
const { logger } = require("../config/logger");

module.exports.register = async (req, res) => {
  logger.addContext('route',req.route.path);
  const {body} = req;
  const newUser = await User.create({ ...body }, async (err, user) => {
    if (err) {
      const {errors} = err
      logger.error(`${Object.keys(errors)} errors are existed`);
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({errors, message: "-User Cannot be Registed-" });
    }
    const responseData = _.pick(user, ["_id", "username", "email", "phone","firstName","lastName","name"])
    logger.info(`user was registered with the email ${user.email}`);
    return res
      .status(HttpStatus.OK)
      .json({responseData,
        message: "-User Is Sucessfully Registered-"
      });
  });
};

module.exports.login = (req, res) => {
  logger.addContext('route',req.route.path);
  const {user} = req;
  console.log(user)
  if (user !== "error") {
    const tokenData = {
      _id: user._id,
      username: user.username,
      createdAt: Number(new Date())
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);
    logger.error(`-${user.email} was logged in.-`);
    return res
      .status(HttpStatus.OK)
      .json({ token, message: "User Details Listed." });
  } else {
    logger.error(`-errors are existed-`);
    return res
      .status(HttpStatus.NOT_ACCEPTABLE)
      .json({ message: "Please Try Again." });
  }
};

module.exports.account = async (req, res) => {
  logger.addContext('route',req.route.path);
  const { user } = req;
  const responseData = _.pick(user, ["_id", "username", "email", "phone","firstName","lastName","name"])
  logger.info(`-${responseData.email} was given his profile information in.-`);
  return res
    .status(HttpStatus.OK)
    .json({responseData,message: '-User data sucessfully dispatched-'})
};  

module.exports.logout = (req, res) => {
  res.json("User is logged Out");
};

require("dotenv").config;
const _ = require("lodash");
const { User } = require("../models");
const HttpStatus = require("http-status-codes");
const { otpHelper } = require("../helpers/optGenHelper");
const { logger } = require("../helpers/loggerHelper");
const { encodeToken } = require("../helpers/tokenHelper");
const { emailVerifyTemplate } = require("../helpers/mailHelper");
const {
  verifiedHelper,
  replaceHelper,
} = require("../helpers/userOperationHelper");
const { generatePasswordHasher } = require("../helpers/passwordHelper");

module.exports = {
  async register({ route: { path }, body }, res) {
    logger("context", path);
    const otp = await otpHelper("login");
    try {
      const { _id, email } = await User.create({ ...body, otp });
      const payload = { _id, email, createdAt: Date.now() };
      await emailVerifyTemplate(email, otp);
      const token = await encodeToken(payload);
      logger("info", `The user with the ${token} has be registered`);
      return res
        .status(HttpStatus.OK)
        .json({ token, message: "-User Is Sucessfully Registered-" });
    } catch (error) {
      switch (error.name) {
        case "ValidationError":
          logger("warn", `${body.email} had tried to re-register`);
          return res.status(HttpStatus.NOT_ACCEPTABLE).json({
            message: "Your email is already Registered, Please Try to Login",
          });
        case "MongoError":
          logger("warn", `The ${error.errmsg} with was encountered.`);
          return res
            .status(HttpStatus.NOT_ACCEPTABLE)
            .json({ error, message: "Please Choose a Unique User Name" });
        case "Error":
          logger("fatal", `The ${error} was encountered.`);
          return res
            .status(HttpStatus.OK)
            .json({ message: "-User wasn't able to registered-" });
        default:
          logger("fatal", `The ${error} was encountered.`);
          return res.status(HttpStatus.NOT_FOUND).json({
            error,
            message:
              "An Error Was Encountered, Please Contact verifynotspam@outlook.com ",
          });
      }
    }
  },

  async editUser({ user: { _id }, route: { path }, body }, res) {
    logger("context", path);
    try {
      const user = await User.findByIdAndUpdate(
        { _id },
        { $set: { ...body } },
        { new: true, runValidators: true },
      );
      const users = _.pick(user, [
        "_id",
        "username",
        "email",
        "phone",
        "firstName",
        "lastName",
      ]);
      logger("info", `- already verified , login needed- ${_id}`);
      return res
        .status(HttpStatus.OK)
        .json({ users, message: " Update Success." });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.NOT_FOUND).json({ err, message: "Errored" });
    }
  },

  async verifyUser(
    {
      user: { _id, email, otp, isVerified },
      route: { path },
      body: { otpVerify },
    },
    res,
  ) {
    logger("context", path);
    const token = await encodeToken({
      _id,
      email,
      createdAt: Number(new Date()),
    });
    if (isVerified) {
      logger("info", `- already verified , login needed- ${token}`);
      return res
        .status(HttpStatus.OK)
        .json({ token, message: " Already verified, login." });
    }
    try {
      if (otpVerify === otp) {
        await User.findByIdAndUpdate(
          { _id },
          { $set: { isVerified: true } },
          { new: true, runValidators: true },
        );
        logger("info", `- ${token}, has verified his account -`);
        return res
          .status(HttpStatus.OK)
          .json({ token, message: "-User Is Sucessfully Verified-" });
      } else {
        throw new TypeError("wrongOTP");
      }
    } catch (error) {
      logger("error", `-OTP and Email Check-`);
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: "-Please Check the Email or OTP sent-",
      });
    }
  },

  async resetPassword(
    { body: { email, otpVerify, password }, route: { path } },
    res,
  ) {
    logger("context", path);
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: "User doesn't exist, please register" });
    }
    const verified = await verifiedHelper(user);
    const replaced = await replaceHelper(user);
    const { _id, otp } = user;
    if (verified) {
      return res
        .status(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
        .json({ message: "Please verify your email." });
    }
    if (replaced) {
      logger("warn", "- User doesn't exist, Please Register -");
      return res
        .status(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
        .json({ message: " - Check your email for password reset otp - " });
    }
    if (otpVerify === otp) {
      const hashPassword = await generatePasswordHasher(password);
      await User.findByIdAndUpdate(
        { _id },
        { $set: { resetPassword: false, password: hashPassword } },
        { new: true, runValidators: true },
      );
      logger("info", `Password was successfully resetted`);
      return res
        .status(HttpStatus.OK)
        .json({ message: "- Password was successfuly reseted -" });
    } else {
      logger("info", `Password was successfully resetted`);
      return res
        .status(HttpStatus.NOT_MODIFIED)
        .json({ message: "- Password isn't reset -" });
    }
  },

  async login({ user, user: { _id, email, username }, route: { path } }, res) {
    logger("context", path);
    const verified = await verifiedHelper(user);
    if (!user) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: "User doesn't exist, please register" });
    }
    if (verified) {
      const payload = { _id, email, createdAt: Date.now() };
      const token = await encodeToken(payload);
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ token, message: "Please verify your email." });
    }
    logger("info", `-${email} was logged in.-`);
    const token = await encodeToken({
      _id,
      email,
      username,
      createdAt: Number(new Date()),
    });
    return res
      .status(HttpStatus.OK)
      .json({ token, message: "User Details Listed." });
  },

  async account({ user, route: { path } }, res) {
    logger("context", path);
    const verified = await verifiedHelper(user);
    if (!user) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: "User doesn't exist, please register" });
    }
    if (verified) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Please verify your email." });
    }
    const users = _.pick(user, [
      "_id",
      "username",
      "email",
      "phone",
      "firstName",
      "lastName",
    ]);
    logger("info", `-${users.email} was given his profile information in.-`);
    return res
      .status(HttpStatus.OK)
      .json({ users, message: "-User data sucessfully dispatched-" });
  },

  async logout({ user, route: { path } }, res) {
    logger("context", path);
    const verified = await verifiedHelper(user);
    if (!user) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: "User doesn't exist, please register" });
    }
    if (verified) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Please verify your email." });
    }
    res.json("User is logged Out");
  },
};

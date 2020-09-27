const mongoose = require("mongoose");
const validator = require("validator");
const moment = require("moment");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const { generatePasswordHasher } = require("../helpers/passwordHelper");

const userSchema = new Schema({
  // required
  firstName: {
    type: String,
    required: true,
    minlength: 4,
  },
  //required
  lastName: {
    type: String,
    required: true,
    maxlength: 5,
  },
  phone: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value);
      },
      message: function (value) {
        return `${value} isnt the proper phone number format.`;
      },
    },
  },
  //required
  username: {
    type: String,
    // required: true,
    unique: true,
    minlength: 5,
  },
  //required
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "Invalid Email Format.";
      },
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  //required
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  otp: {
    type: String,
    required: true,
  },
  resetRequest: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: moment().toISOString(),
  },
  updatedAt: {
    type: Date,
    default: moment().toISOString(),
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew) {
    const { firstName, lastName, password } = user;
    user.username = firstName + " " + lastName;
    user.password = await generatePasswordHasher(password);
    next();
  } else {
    user.updatedAt = moment().toISOString();
    next();
  }
});

userSchema.plugin(uniqueValidator, { message: `{PATH} Already Exists` });

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};

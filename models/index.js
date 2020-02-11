const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    minlength: 5
  },
  lastName: {
    type: String
  },
  name: {
    type: String,
    default: function() {
      return `${this.firstName || ""} ${this.lastName || ""}`.trim();
    }
  },
  phone:{
      type: String,
      validate:{
        validator: function(value){
            return validator.isMobilePhone(value)
        },
        message: function(value){
            return `${value} isnt the proper phone number format.`
        }
      }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: function() {
        return "Invalid Email Format.";
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then(salt => {
      bcryptjs.hash(user.password, salt).then(encrpytedPassword => {
        user.password = encrpytedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.plugin(uniqueValidator, { message: `{PATH} Already Exists` });

const User = mongoose.model("User", userSchema);

module.exports = {
  User
};

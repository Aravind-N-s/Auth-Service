const { otpHelper } = require("./optGenHelper");
const { encodeToken } = require("./tokenHelper");
const { emailVerifyTemplate } = require("./mailHelper");
const { User } = require("../models");

module.exports = {
  async verifiedHelper({ _id, email, isVerified }) {
    if (!isVerified) {
      const otp = await otpHelper("login");
      emailVerifyTemplate(email, otp);
      await User.findByIdAndUpdate({ _id }, { $set: { otp } });
      const token = await encodeToken({
        _id,
        email,
        createdAt: Number(new Date()),
      });
      return token;
    }
    return false;
  },
  async replaceHelper({ _id, email, resetRequest }) {
    if (!resetRequest) {
      const otp = await otpHelper("reset");
      emailVerifyTemplate(email, otp);
      await User.findByIdAndUpdate(
        { _id },
        { $set: { otp, resetRequest: true } },
      );
      return true;
    }
    return false;
  },
};

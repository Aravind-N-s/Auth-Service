const otpGenerator = require("otp-generator");
module.exports = {
  async otpHelper(type) {
    let payload;
    switch (type) {
      case "login":
        payload = otpGenerator.generate(6, {
          digits: true,
          upperCase: true,
          specialChars: true,
        });
        break;
      case "reset":
        payload = otpGenerator.generate(4, {
          alphabets: false,
          digits: true,
          specialChars: true,
        });
        break;
      default:
    }
    return payload;
  },
};

const HttpStatus = require("http-status-codes");
module.exports = {
  test(req, res) {
    return res
      .status(HttpStatus.OK)
      .json({ message: "-!!Test Route - AuthService is Up!!-" });
  },
};

const jwt = require("jsonwebtoken");
module.exports = {
  async encodeToken(payload) {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    return token;
  },

  async decodeToken(token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return err;
        }
        const error = new Error();
        return error;
      }
      return decoded;
    });
  },
};

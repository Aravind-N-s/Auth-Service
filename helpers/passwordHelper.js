const bcryptjs = require("bcryptjs");

module.exports = {
  async generatePasswordHasher(password) {
    return new Promise((resolve, reject) => {
      bcryptjs.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcryptjs.hash(password, salt, (hashErr, hash) => {
          if (hashErr) {
            reject(hashErr);
          }
          resolve(hash);
        });
      });
    });
  },
};

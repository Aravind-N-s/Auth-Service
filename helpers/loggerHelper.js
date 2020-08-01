const { logger } = require("../utils/logger");
module.exports = {
  async logger(type, msg) {
    switch (type) {
      case "info":
        return logger.info(`${msg}`);
      case "warn":
        return logger.warn(`${msg}`);
      case "error":
        return logger.error(`${msg}`);
      case "fatal":
        return logger.fatal(`${msg}`);
      case "context":
        return logger.addContext("route", msg);
      default:
        return logger.debug("Logger Failing");
    }
  },
};

module.exports = {
  async errorType({ type, info }) {
    const error = new Error();
    switch (type) {
      case "userToken":
        error.type = "CUSTOM_ERROR";
        error.info = info;
        break;
      default:
        return error;
    }
  },
};

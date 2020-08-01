const sgMail = require("@sendgrid/mail");
const { logger } = require("./loggerHelper");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  from: process.env.EMAIL,
};

module.exports = {
  async emailVerifyTemplate(...payload) {
    logger("context", "Email Verification");
    msg.to = payload[0];
    msg.subject = "Email Verification";
    msg.html = `<p>Last Step Left to Activate Your Account. \n
        Please use the OTP \n
        <strong>${payload[1]}</strong>\n
        to finish verification of your account </p>`;

    return sgMail.send(msg);
  },

  async resetPasswordTemplete(...payload) {
    logger("context", "Email Password Reset");
    msg.to = payload[0];
    msg.subject = "Password Reset Email";
    msg.html = `<p>Email To Reset Password\n
  Please use the OTP \n
  <strong>${payload[1]}</strong>\n
  to finish verification of your account </p>`;
    if (payload[0] !== null) {
      try {
        await sgMail.send(msg);
        logger.info(`email was sent to ${payload[0]}`);
      } catch (error) {
        logger.warn(`${error.response}`);
      }
    }
  },
};

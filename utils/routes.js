const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controller");

//user
router.post("/register", userController.register);
router.post(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  userController.verifyUser,
);
router.post("/reset", userController.resetPassword);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userController.login,
);
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  userController.editUser,
);
router.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  userController.account,
);
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userController.logout,
);

module.exports = router;

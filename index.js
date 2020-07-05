require("dotenv").config();
const { mongoose } = require("./config/database");
const port = process.env.PORT;
const express = require("express");
const { consoleLogger } = require("./config/logger");
const HttpStatus = require("http-status-codes");
const cors = require("cors");
const app = express();
const passport = require("passport");

const router = require("./config/routes");

app.use(express.json());
app.use(cors());

app.use(passport.initialize());

require("./middlewares/passport-local");

require("./middlewares/passport-jwt");

app.get("/", (req, res) => {
  return res
    .status(HttpStatus.OK)
    .json({ message: ".AuthServices is active!." });
});

app.use("/user", router);

app.listen(port, () => {
  consoleLogger.info("Listening on port", port);
});

module.exports = app;

require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const { consoleLogger } = require("./utils/logger");
const cors = require("cors");
const app = express();
const passport = require("passport");

const router = require("./utils/routes");

app.use(express.json());
app.use(cors());

app.use(passport.initialize());

require("./middlewares/passport-local");

require("./middlewares/passport-jwt");

app.use("/user", router);

app.listen(port, () => {
  consoleLogger.info("Listening on port", port);
});

module.exports = app;

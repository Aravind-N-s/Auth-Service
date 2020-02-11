/** Logger Configuration
 * @module connection/logger
 */

/**
 * @namespace loggerConfiguration
 */

/**
 * The Logging Framework for JavaScrip.
 * @const
 */
const log4js = require("log4js");
require('dotenv').config()
/**
 * Log4js Configuration Options
 * @name configure
 * @function
 * @memberof module:connection/logger~loggerConfiguration
 * @inner
 * @param {object} configOptions - Logger Configuration Options
 * @property {Object} logstashConfig - Logstash Appender
 * @property {Object} consoleConfig - Console Appender
 * @property {Object} fileConfig - File Appender
 * @property {Object} fileConfig - Crash Appender
 */
log4js.configure({
  appenders: {
    /**
     * Logstash Appender
     */
    logstash: {
      type: "@log4js-node/logstash-http",
      url: process.env.ELASTIC_LOGSTASH_URL,
      application: "test",
      logType: "application"
    },

    /**
     * Console Appender
     */
    console: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%z %d{yyyy-MM-dd hh:mm:ss.SSS} %p %c %m"
      }
    },

    /**
     * File Appender
     */
    file: {
      type: "file",
      filename: `log-auth-performance.log`,
      maxLogSize: 10485760,
      compress: true
    },
    /**
     * Crash Appender
     */
    crash: {
      type: "file",
      filename: `log-auth-crash.log`,
      maxLogSize: 10485760,
      compress: true
    }
  },
  categories: {
    default: { appenders: ["file", "logstash"], level: "info" },
    crash: { appenders: ["crash", "logstash"], level: "warn" },
    console: { appenders: ["console"], level: "info" }
  }
});

/**
 * Default logger
 * @const
 */
const logger = log4js.getLogger();
/**
 * Crash logger
 * @const
 */
const crashLogger = log4js.getLogger('crash')
/**
 * Console Logger
 * @const
 */
const consoleLogger = log4js.getLogger("console");

module.exports = { logger, crashLogger, consoleLogger };
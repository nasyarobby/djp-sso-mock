const SNL = require("simple-node-logger");

// create a rolling file logger based on date/time that fires process events
const DEFAULT_CONFIGS = {
  logDirectory: process.env.LOGGER_LOG_DIR || "logs", // NOTE: folder must exist and be writable...
  fileNamePattern: process.env.LOGGER_FILENAME_PATTERN || "roll-<DATE>.log",
  dateFormat: process.env.LOGGER_DATE_FORMAT || "YYYY.MM.DD",
};

const RollingFileLogger = SNL.createRollingFileLogger(DEFAULT_CONFIGS);

const ConsoleLogger = SNL.createSimpleLogger();

module.exports = { RollingFileLogger, ConsoleLogger };

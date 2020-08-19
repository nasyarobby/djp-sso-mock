require("dotenv").config();

const APP_CONFIG = {
  PORT: process.env.APP_SERVER_PORT || 3000,
  LOG_OUTPUT: process.env.APP_LOG_OUTPUT || "CONSOLE",
};

const log =
  APP_CONFIG.LOG_OUTPUT === "CONSOLE"
    ? require("./Logger").ConsoleLogger
    : require("./Logger").RollingFileLogger;

const server = require("./Server");

server.get("/", function (req, res, next) {
  res.jsend.success({ foo: "bar" });
});

server.listen(APP_CONFIG.PORT, (err) => {
  if (err) {
    log.error(err.message);
    process.exit(1);
  }

  log.info("Server is running on port ", APP_CONFIG.PORT);
});

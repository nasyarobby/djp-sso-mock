require("dotenv").config();
const SsoService = require("./SsoService");
const DataProvider = require("./SimpleDataProvider");
const jwt = require("jsonwebtoken");

const APP_CONFIG = {
  PORT: process.env.APP_SERVER_PORT || 3002,
  LOG_OUTPUT: process.env.APP_LOG_OUTPUT || "CONSOLE",
  JWT_TOKEN: process.env.JWT_TOKEN || "simplesso",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "2h",
};

const log =
  APP_CONFIG.LOG_OUTPUT === "CONSOLE"
    ? require("./Logger").ConsoleLogger
    : require("./Logger").RollingFileLogger;

const server = require("./Server");

const sso = new SsoService({
  authenticator: (npwp, password, user) => {
    if (user) {
      return user.password === password;
    } else {
      return false;
    }
  },
  dataProvider: new DataProvider({ jsonFile: "./data/wajibpajak.json" }),
});

server.post("/login", login);

function login(req, res, next) {
  const npwp = req.body && req.body.npwp;
  const password = req.body && req.body.password;

  if (npwp && password) {
    const authenticated = sso.login(npwp, password);
    if (authenticated) {
      const token = jwt.sign(authenticated, APP_CONFIG.JWT_TOKEN, {
        expiresIn: APP_CONFIG.JWT_EXPIRES_IN,
      });
      return res.jsend.success({ token });
    } else {
      return res.jsend.fail({ login: "Login gagal." });
    }
  } else {
    return res.jsend.fail({
      npwp: npwp ? undefined : "wajib diisi",
      password: password ? undefined : "wajib diisi",
    });
  }
}

server.listen(APP_CONFIG.PORT, (err) => {
  if (err) {
    log.error(err.message);
    process.exit(1);
  }

  log.info("Server is running on port ", APP_CONFIG.PORT);
});

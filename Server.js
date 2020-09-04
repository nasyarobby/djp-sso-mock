const restify = require("restify");
const server = restify.createServer();

const cors = require("restify-cors-middleware")({
  origins: ["*"],
});
server.pre(cors.preflight);
server.use(cors.actual);

const jsend = require("jsend");
server.use(jsend.middleware);
server.use(restify.plugins.bodyParser());

module.exports = server;

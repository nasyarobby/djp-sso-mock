const restify = require("restify");
const server = restify.createServer();

const jsend = require("jsend");
server.use(jsend.middleware);
server.use(restify.plugins.bodyParser());

module.exports = server;

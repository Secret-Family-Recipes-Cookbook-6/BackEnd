const express = require("express");
const configureMiddleware = require("./configure-middleware");
const { resolve } = require("path");

const server = express();
configureMiddleware(server);

// server.get("/*", (req, res) =>
//   res.sendFile(resolve(__dirname, "../public/index.html"))
// );

module.exports = server;

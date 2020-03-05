const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const apiRouter = require("./routes/api-router");
const { resolve } = require("path");

module.exports = server => {
  server.use(helmet()),
    server.use(cors()),
    server.use(express.json()),
    server.use("/api", apiRouter),
    server.use(express.static(resolve(__dirname, "/public")));
};

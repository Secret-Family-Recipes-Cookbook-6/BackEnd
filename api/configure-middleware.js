const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const apiRouter = require("./routes/api-router");

module.exports = server => {
  server.use(helmet()),
    server.use(cors()),
    server.use(express.json()),
    server.use("/api", apiRouter);
};

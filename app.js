const appRouter = require("./router/index.js");
const express = require("express");
const cors = require("cors");
const { errorHandlers } = require("./middleware");
// const { errorHandlers } = require('./middleware')

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", appRouter)
app.use(express.static('public'))
app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler)

module.exports = app;
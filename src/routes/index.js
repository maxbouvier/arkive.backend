const express = require('express');
const router = require('../routes/api/v1/demo');

const indexRouter = express.Router();


indexRouter.use("/api/v1/", router);

module.exports = indexRouter


const express = require('express');

const app = express();
const router = require('./routes');
// Serves up all static and generated assets in ../client/dist.

/* ---------------- Server listens ---------------- */
app.use('', router);
module.exports = app;

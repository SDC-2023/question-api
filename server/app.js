require('dotenv').config();
const express = require('express');

const app = express();

// Serves up all static and generated assets in ../client/dist.

/* ---------------- Server listens ---------------- */

app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);

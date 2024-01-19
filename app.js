// app/index.js atau app/app.js
const express = require('express');
const { validationRules, validate } = require('./validationMiddleware');
const router = require('./src/routes/api');
const app = express();

app.use(express.json());

// Middleware untuk validasi input
app.use(validationRules());

// Middleware untuk menangkap hasil validasi
app.use(validate);

// Gunakan routing (router)
app.use('/', router);

const { APP_PORT } = process.env;
app.listen(APP_PORT, () =>
  console.log(`Server running at: http://localhost:${APP_PORT}`)
);

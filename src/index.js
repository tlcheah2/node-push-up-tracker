// require('dotenv').config();
const express = require('express');
const app = express();
const pushupService = require('./pushup/pushupService');
const router = require('./router');

// Added router
app.use(router);

app.get('/', async (req, res) => {
  console.log('Welcome to Push Up Node Tracker');
  res.send(`Welcome to Push Up Node Tracker!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
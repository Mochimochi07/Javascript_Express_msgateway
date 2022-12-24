const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const logs = [];

app.get('/dashboard', (req, res) => {
  const totalRevenue = logs.reduce((acc, log) => acc + log.total, 0);
  const totalOrders = logs.length;
  res.send({ totalRevenue, totalOrders });
});

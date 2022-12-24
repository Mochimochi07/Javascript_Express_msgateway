const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const logs = [];

app.post('/log', (req, res) => {
  const { username, foodId, quantity, total } = req.body;
  const log = {
    id: logs.length + 1,
    username,
    foodId,
    quantity,
    total,
    date: new Date()
  };
  logs.push(log);
  res.send(log);
});

app.get('/logs', (req, res) => {
  res.send(logs);
});

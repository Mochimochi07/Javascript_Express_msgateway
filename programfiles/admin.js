const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const admins = [
  {
    id: 1,
    username: 'admin',
    password: 'password'
  }
];

const food = [
  {
    id: 1,
    name: 'Pizza',
    price: 10
  },
  {
    id: 2,
    name: 'Hamburger',
    price: 5
  },
  {
    id: 3,
    name: 'Hot Dog',
    price: 3
  }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const admin = admins.find(a => a.username === username && a.password === password);
  if (admin) {
    const token = jwt.sign({ sub: admin.id, username: admin.username }, 'mysecretkey');
    res.send({ access_token: token });
  } else {
    res.status(401).send({ message: 'Invalid login credentials' });
  }
});

app.get('/food', (req, res) => {
  res.send(food);
});

app.post('/food', (req, res) => {
  const { name, price } = req.body;
  const newFood = {
    id: food.length + 1,
    name,
    price
  };
  food.push(newFood);
  res.send(newFood);
});

app.put('/food/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const updatedFood = {
    id,
    name,
    price
  };
  const index = food.findIndex(f => f.id === +id);
  food[index] = updatedFood;
  res.send(updatedFood);
});

app.delete('/food/:id', (req, res) => {
  const { id } = req.params;
  const index = food.findIndex(f => f.id === +id);
  food.splice(index, 1);
  res.send({ message: 'Food item deleted' });
});

app.get('/clients', (req, res) => {
  res.send(users);
});

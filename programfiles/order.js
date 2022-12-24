const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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

app.get('/food', (req, res) => {
  res.send(food);
});

app.post('/order', (req, res) => {
  const { foodId, quantity } = req.body;
  const selectedFood = food.find(f => f.id === foodId);
  if (selectedFood) {
    const total = selectedFood.price * quantity;
    res.send({ total });
  } else {
    res.status(404).send({ message: 'Food item not found' });
  }
});

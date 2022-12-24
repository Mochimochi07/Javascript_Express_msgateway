const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1'
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2'
  }
];

const SECRET_KEY = 'secretkey';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ auth: true, token });
  } else {
    res.send({ auth: false, message: 'Invalid login credentials' });
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    res.status(400).send({ message: 'Username is already taken' });
  } else {
    const user = {
      id: users.length + 1,
      username,
      password
    };
    users.push(user);
    res.send(user);
  }
});

app.listen(3001, () => {
  console.log('Auth microservice listening on port 3001');
});

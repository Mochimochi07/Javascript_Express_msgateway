const express = require('express');
const Gateway = require('express-gateway');

const gateway = new Gateway();

gateway.register('auth', {
  target: 'http://localhost:3001'
});

gateway.register('admin', {
  target: 'http://localhost:3002'
});

gateway.register('order', {
  target: 'http://localhost:3003'
});

gateway.register('log', {
  target: 'http://localhost:3004'
});

gateway.register('dashboard', {
  target: 'http://localhost:3005'
});

gateway.start();

const express = require('express');
const register = express();
const { checkRegisterInput } = require('./utils.js');

register.post('/', (req, res) => {
  if (checkRegisterInput(req.body.username, req.body.pass)) {
    res.redirect('/login.html');
  }
});

module.exports = register;
const express = require('express');
const register = express();
const { checkRegisterInputLengths } = require('./utils.js');

register.post('/', (req, res) => {
  if (checkRegisterInputLengths(req.body.username, req.body.pass)) {
    res.redirect('/login.html');
  }
});

module.exports = register;
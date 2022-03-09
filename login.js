const express = require('express');
const login = express()
const { checkLoginInput } = require('./utils.js');

login.post('/', (req, res) => {
  if (checkLoginInput(req.body.Username, req.body.pass)) {
    res.redirect('/profile.html');
  }
});

module.exports = login;
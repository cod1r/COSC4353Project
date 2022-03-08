const express = require('express');
const login = express()
const { checkLoginInputLengths } = require('./utils.js');

login.post('/', (req, res) => {
  if (checkLoginInputLengths(req.body.username, req.body.pass)) {
    res.redirect('/profile.html');
  }
});

module.exports = login;
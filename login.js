const express = require('express');
const login = express();
const { checkLoginInput, checkUsernameCharacters, checkPasswordCharacters } = require('./utils.js');

login.post('/', (req, res) => {
  if (
    req.body.Username && 
    req.body.pass && 
    checkUsernameCharacters(req.body.Username) && 
    checkPasswordCharacters(req.body.pass) && 
    checkLoginInput(req.body.Username, req.body.pass)
  ) {
    res.redirect('/profile.html');
  }
});

module.exports = login;
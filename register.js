const express = require('express');
const register = express();
const { checkRegisterInput, checkUsernameCharacters, checkPasswordCharacters } = require('./utils.js');

register.post('/', (req, res) => {
  if (
    req.body.Username && 
    req.body.passw && 
    checkUsernameCharacters(req.body.Username) && 
    checkPasswordCharacters(req.body.pass) && 
    checkRegisterInput(req.body.Username, req.body.pass)
  ) {
    res.redirect('/login.html');
  }
});

module.exports = register;
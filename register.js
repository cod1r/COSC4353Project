const express = require('express');
const connection = require('./creds.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const register = express();
const { checkRegisterInput, checkUsernameCharacters, checkPasswordCharacters } = require('./utils.js');

register.post('/', (req, res) => {
  if (
    req.body.Username && 
    req.body.pass && 
    checkUsernameCharacters(req.body.Username) && 
    checkPasswordCharacters(req.body.pass) && 
    checkRegisterInput(req.body.Username, req.body.pass)
  ) {
    console.log(`${req.body.Username}` + `${req.body.pass}`)

    // need error checking to make sure the username isn't already taken 
    bcrypt.hash(req.body.pass, 10, function(err, hash) {
      connection.query(`
          BEGIN TRANSACTION; 
          INSERT INTO user_login (username, password)
          VALUES (?, ?);
          COMMIT; 
          `, [req.body.Username, hash], function (error, results, fields) {
            if (error) throw error;
            jwt.sign({name: req.body.Username}, process.env.secret, function (err, decoded) {
              res.cookie('token', decoded, { 
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), 
                httpOnly: true 
              });
              res.redirect('/login.html');
            });
          });
    });
    } 
});

module.exports = register;
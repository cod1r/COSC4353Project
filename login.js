const express = require('express');
const connection = require('./creds.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
      connection.query(`SELECT * FROM user_login WHERE username = ?;`, 
      [req.body.Username], function (error, results, fields) {
        if (error) throw error;
        if (results.rowCount == 0) {
          console.log(results.rowCount);
          return;
        }
        bcrypt.compare(req.body.pass, results[0].password, function(err, result) {
          if (result) {
            jwt.sign({name: req.body.Username}, process.env.secret, function (err, decoded) {
              res.cookie('token', decoded, { 
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), 
                httpOnly: true 
              });
              res.redirect('/profile.html');
            });
          }
          else {
            res.status(401).end();
          }
        });
      });
  }
});

module.exports = login;
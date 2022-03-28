const express = require('express');
const connection = require('./creds.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const login = express();
const { checkLoginInput, checkUsernameCharacters, checkPasswordCharacters, verifyToken } = require('./utils.js');

login.post('/', (req, res) => {
  if (
    req.body.Username && 
    req.body.pass && 
    checkUsernameCharacters(req.body.Username) && 
    checkPasswordCharacters(req.body.pass) && 
    checkLoginInput(req.body.Username, req.body.pass)
  ) {
      connection.query(`SELECT * FROM user_login WHERE username = ? && password = ?;`, 
      [req.body.Username, req.body.pass], function (error, results, fields) {
        if (error) throw error;
        console.log(results.length);
        if (results.length == 0) {
          console.log(results.length);
          //res.redirect('/login.html');
          //res.status(200).end();
          return; 
        }
        bcrypt.compare(req.body.pass, results[0].password, function(err, result) {
          if (result) {
            if (!req.cookies?.token) {
              jwt.sign({name: req.body.Username}, process.env.secret, function (err, token) {
                res.cookie('token', token, { 
                  expires: new Date(Date.now() + 1000 * 60 * 60 * 24), 
                  httpOnly: true 
                });
              });
            }
            res.redirect('/profile.html');
          }
          else {
            res.status(401).end();
          }
        });
      });
  }
});

module.exports = login;
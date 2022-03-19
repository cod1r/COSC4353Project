const express = require('express');
const connection = require('./creds.js');
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
          // username doesn't exist 
        } else if (results.password == req.body.pass) {
          console.log(results.password);
          // complete successful login 
        } else {
          console.log("Invalid Password");
          // invalid password 
        }
      });
    res.redirect('/profile.html');
  }
});

module.exports = login;
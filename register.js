const express = require('express');
const connection = require('./creds.js');
const register = express();
const { checkRegisterInput, checkUsernameCharacters, checkPasswordCharacters } = require('./utils.js');

//console.log(connection);

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
      connection.query(`
          BEGIN TRANSACTION; 
          INSERT INTO user_login (username, password)
          VALUES (?, ?);
          COMMIT; 
          `, [req.body.Username, req.body.pass], function (error, results, fields) {
            if (error) throw error;
      });
    } 
    res.redirect('/login.html');
});



module.exports = register;
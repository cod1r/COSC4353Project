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
      connection.query(`SELECT * FROM UserCredentials WHERE username = ?;`, 
      [req.body.Username], function (error, results, fields) {
        if (error) {
					console.error(error);
					res.status(500).end();
					return;
				}
				if (results.length > 0) {
					bcrypt.compare(req.body.pass, results[0].password, function(err, result) {
						if (result) {
							if (!req.cookies?.token) {
								jwt.sign(
									{name: req.body.Username}, process.env.secret, function (err, token) {
									res.cookie('token', token, { 
										expires: new Date(Date.now() + 1000 * 60 * 60 * 24), 
										httpOnly: true 
									});
								});
							}
							res.redirect('/profile.html');
						}
						else {
							res.status(401).json({
								error: "WRONG LOSER"
							});
						}
					});
				}
				else {
					res.status(401).json({
						error: "WRONG LOSER"
					});
				}
      });
  }
	else {
		res.status(401).end();
	}
});

module.exports = login;

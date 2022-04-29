const express = require("express");
const connection = require("./creds.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const register = express();
const {
  checkRegisterInput,
  checkUsernameCharacters,
  checkPasswordCharacters,
  verifyToken,
} = require("./utils.js");

register.post("/", (req, res) => {
  if (
    req.body.Username &&
    req.body.pass &&
    checkUsernameCharacters(req.body.Username) &&
    checkPasswordCharacters(req.body.pass) &&
    checkRegisterInput(req.body.Username, req.body.pass)
  ) {
    console.log(req.body);
    // need error checking to make sure the username isn't already taken
    connection.query(
      `SELECT * FROM UserCredentials WHERE username = ?`,
      [req.body.Username],
      function (error, results, fields) {
        if (error) {
          console.error(error);
          res.status(500).end();
          return;
        }
        if (results.length > 0) {
          res.status(401).json({
            error: "Username already taken",
          });
          return;
        } else {
          bcrypt.hash(req.body.pass, 10, function (err, hash) {
            connection.query(
              `
								INSERT INTO UserCredentials (username, password)
								VALUES (?, ?); 
								INSERT INTO ClientInformation (username, full_name, address1, address2, city, state, zipcode)
								VALUES (?, '', '', '', '', '', '     ');`,
              [req.body.Username, hash, req.body.Username],
              function (error, results, fields) {
                if (error) throw error;
                jwt.sign(
                  { name: req.body.Username },
                  process.env.secret,
                  function (err, token) {
                    res.cookie("token", token, {
                      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                      httpOnly: true,
                    });
                    res.redirect("/login.html");
                  }
                );
              }
            );
          });
        }
      }
    );
  } else {
    res.status(401).json({});
  }
});

module.exports = register;

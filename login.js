const express = require("express");
const connection = require("./creds.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = express();
const {
  checkLoginInput,
  checkUsernameCharacters,
  checkPasswordCharacters,
  verifyToken,
} = require("./utils.js");

login.post("/", (req, res) => {
  console.log("body", req.body);
  if (
    req.body.Username &&
    req.body.pass &&
    checkUsernameCharacters(req.body.Username) &&
    checkPasswordCharacters(req.body.pass) &&
    checkLoginInput(req.body.Username, req.body.pass)
  ) {
    connection.query(
      `SELECT * FROM UserCredentials WHERE username = ?;`,
      [req.body.Username],
      function (error, results, fields) {
        if (error) {
          console.error(error);
          res.status(500).end();
          return;
        }
        if (results.length > 0) {
          bcrypt.compare(
            req.body.pass,
            results[0].password,
            function (err, result) {
              if (err) {
                console.error(err);
                res.status(500).end();
                return;
              }
              if (result) {
                if (!req.cookies?.token) {
                  jwt.sign(
                    { name: req.body.Username },
                    process.env.secret,
                    function (err1, token) {
                      if (err1) {
                        console.error(err);
                        res.status(500).end();
                        return;
                      }
                      res.cookie("token", token, {
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        httpOnly: true,
                      });
                      console.log("TOKEN", token);
                      res.redirect("/profile.html");
                    }
                  );
                }
              } else {
                res.status(401).json({
                  error: "WRONG USER INPUT",
                });
              }
            }
          );
        } else {
          res.status(401).json({
            error: "WRONG USER INPUT",
          });
        }
      }
    );
  } else {
    res.status(401).end();
  }
});

module.exports = login;

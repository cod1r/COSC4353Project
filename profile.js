const express = require('express');
const profile = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const connection = require('./creds.js');
const { checkProfileInput, verifyToken } = require('./utils.js');

profile.use(cookieParser());

profile.post('/changeProfile', (req, res) => {
  if (
    checkProfileInput(
      req.body.name,
      req.body.Address1,
      req.body.City,
      req.body.State,
      req.body.Zipcode
    )
  ) 
  var decoded = verifyToken(req.cookies.token);
  if (decoded) {
    connection.query(`
    UPDATE user_info 
    SET full_name = ?, 
        address1 = ?, 
        address2 = ?, 
        city = ?, 
        state = ?, 
        zipcode = ?
    WHERE username = ?;`, 
    [req.body.name, req.body.Address1, req.body.Address2, req.body.City, req.body.State, req.body.Zipcode, decoded.name], function (error, results, fields) {
      if (error) throw error;
    });
  }
  {
    res.redirect('/profile.html');
    res.status(200).end();
  }
});


profile.get('/', (req, res) => {
  if (req.cookies.token) {
    var decoded = verifyToken(req.cookies.token);
    if (decoded) {
      connection.query(`SELECT * FROM user_info WHERE username = ?;`, 
      [decoded.name], function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
          FullName: results[0].full_name,
          Address1: results[0].address1,
          Address2: results[0].address2,
          City: results[0].city,
          State: results[0].state,
          Zipcode: results[0].zipcode,
        });
      });
    }
    else {
      res.status(401).end();
    }
  }
});

module.exports = profile;
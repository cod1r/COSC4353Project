const express = require('express');
const profile = express();
const cookieParser = require('cookieParser');
const jwt = require('jsonwebtoken');
const { checkProfileInput } = require('./utils.js');

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
  ) {
    res.redirect('/profile.html');
    res.status(200).end();
  }
});


profile.get('/', (req, res) => {
  if (req.cookies.token) {
    let decoded = verifyToken(req.cookies.token);
    if (decoded) {
      res.status(200).json({
        FullName: 'BILLY JOE',
        Address1: 'BILLY\'S HOME',
        Address2: '',
        City: 'BILLY\'S CITY',
        State: 'BILLY\'S STATE',
        Zipcode: 'BILLY\'S ZIPCODE'
      });
    }
    else {
      res.status(401).end();
    }
  }
});

module.exports = profile;
const express = require('express');
const profile = express();
const { checkProfileInput } = require('./utils.js');

profile.post('/changeprofile', (req, res) => {
  if (
    checkProfileInput(
      req.body.name,
      req.body.Address1,
      req.body.City,
      req.body.State,
      req.body.Zipcode
    )
  ) {
    res.status(200).end();
  }
});

profile.get('/', (req, res) => {
  res.status(200).json({
    FullName: 'BILLY JOE',
    Address1: 'BILLY\'S HOME',
    Address2: '',
    City: 'BILLY\'S CITY',
    State: 'BILLY\'S STATE',
    Zipcode: 'BILLY\'S ZIPCODE'
  })
});

module.exports = profile;
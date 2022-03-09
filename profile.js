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

});

module.exports = profile;
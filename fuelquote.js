const express = require('express');
const fuelQuote = express();
const { checkFuelQuoteFormInput, isNumber } = require('./utils.js');

fuelQuote.post('/fuelQuoteForm', (req, res) => {
  if (isNumber(req.body.gallons) && checkFuelQuoteFormInput(Number(req.body.gallons), req.body.date)) {
    res.status(200).end();
  }
});

module.exports = fuelQuote;
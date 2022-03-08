const express = require('express');
const fuelQuote = express();
const { checkFuelQuoteFormInputLengths, isNumber } = require('./utils.js');

fuelQuote.post('/fuelQuoteForm', (req, res) => {
  if (isNumber(req.body.gallons) && checkFuelQuoteFormInputLengths(Number(req.body.gallson), )) {
    res.status(200).end();
  }
});

module.exports = fuelQuote;
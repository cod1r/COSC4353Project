const express = require('express');
const fuelQuote = express();
const { checkFuelQuoteFormInput, isNumber } = require('./utils.js');

fuelQuote.post('/fuelQuoteForm', (req, res) => {
  if (isNumber(req.body.gallons) && checkFuelQuoteFormInput(Number(req.body.gallons), req.body.date)) {
    res.status(200).end();
  }
});

fuelQuote.get('/', (req, res) => {
  res.status(200).json({
    1: {
      QuoteDate: '0000-00-00',
      GallonsRequested: 0,
      DeliveryAddress: 'URMOM',
      DeliveryDate: '9999-99-99',
      SuggestedPrice: '42069',
      TotalAmount: 999999
    }
  });
});

module.exports = fuelQuote;
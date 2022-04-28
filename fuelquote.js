const express = require('express');
const fuelQuote = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const connection = require('./creds.js');
const { checkFuelQuoteFormInput, isNumber, verifyToken } = require('./utils.js');

fuelQuote.use(cookieParser());

fuelQuote.post('/fuelQuoteForm', (req, res) => {
  let body = JSON.parse(req.body);
  if (isNumber(body.gallons) && checkFuelQuoteFormInput(Number(body.gallons), body.date)) {
    let date = new Date();
    let formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    if (req.cookies?.token) {
      let decoded = verifyToken(req.cookies.token);
      if (decoded) {
        connection.query(`
        INSERT INTO FuelQuote (quote_date, username, gallons_requested, delivery_address, delivery_date, suggested_price_per_gallon, total_amount_due)
        VALUES (?, ?, ?, (SELECT address1 FROM ClientInformation WHERE username = ?), ?, 42069, 42690)`, 
          [formattedDate, decoded.name, body.gallons, decoded.name, body.date], function (error, results, fields) {
          if (error) {
            console.error(error);
            res.status(500).end();
            return;
          }
          if (results.rowCount == 0) {
            console.log(results.rowCount);
            return;
          }
          res.status(200).redirect('/fuelQuoteForm.html');
        });
      }
    }
  }
});

fuelQuote.get('/', (req, res) => {
  if (req.cookies.token) {
    let decoded = verifyToken(req.cookies.token);
    if (decoded) {
      connection.query(`SELECT * FROM FuelQuote WHERE username = ?;`, [decoded.name], function (error, results, fields) {
        if (error) throw error;
        if (results.rowCount == 0) {
          console.log(results.rowCount);
          return;
        }
        let response = {};
        /*
         loop through results
          for every row do 
            response[i + 1] = {results[i].quotedate, reults[0]....}
          res.status(200).json(response);
        */
        for (let i = 0; i < results.length; i++) 
        {
          response[i+1] = {
            QuoteDate: results[i].quote_date,
            GallonsRequested: results[i].gallons_requested,
            DeliveryAddress: results[i].delivery_address,
            DeliveryDate: results[i].delivery_date,
            SuggestedPrice: results[i].suggested_price_per_gallon,
            TotalAmount: results[i].total_amount_due
          }
        }
        console.log(response);
        res.status(200).json(response);
      });
    }
    else {
      res.status(401).end();
    }
  }
});

module.exports = fuelQuote;
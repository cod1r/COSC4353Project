const express = require("express");
const fuelQuote = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connection = require("./creds.js");
const {
  checkFuelQuoteFormInput,
  isNumber,
  verifyToken,
  calcPrice,
} = require("./utils.js");

fuelQuote.use(cookieParser());

fuelQuote.post("/fuelQuoteForm", (req, res) => {
  let body = JSON.parse(req.body);
  if (
    isNumber(body.gallons) &&
    checkFuelQuoteFormInput(Number(body.gallons), body.date)
  ) {
    let date = new Date();
    let formattedDate = `${date.getUTCFullYear()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCDate()}`;
    if (req.cookies?.token) {
      let decoded = verifyToken(req.cookies.token);
      if (decoded) {
        // checks if in texas or not (Location factor based on client's address)
        connection.query(
          `SELECT * FROM ClientInformation WHERE username = ?;`,
          [user.name],
          function (error1, results1, fields) {
            if (error1) {
              console.error(error1);
              res.status(500).end();
              return;
            }
            // checks if there is any history (Rate History factor of Fuel Quote history)
            connection.query(
              `SELECT * FROM FuelQuote WHERE username = ?;`,
              [user.name],
              function (error2, results2, fields2) {
                if (error2) {
                  console.error(error2);
                  res.status(500).end();
                  return;
                }
                let LocationFactor = 0;
                let GallonsRF = 0;
                let RateHistory = 0;

                if (results1[0].state === "TX") {
                  LocationFactor = 0.02;
                } else {
                  LocationFactor = 0.04;
                }

                if (results2.length > 0) {
                  RateHistory = 0.01;
                } else {
                  RateHistory = 0.0;
                }

                if (gallons >= 1000) {
                  GallonsRF = 0.02;
                } else {
                  GallonsRF = 0.03;
                }

                let price_info = calcPrice(
                  LocationFactor,
                  RateHistory,
                  GallonsRF,
                  gallons
                );
                connection.query(
                  `
                    INSERT INTO FuelQuote (quote_date, username, gallons_requested, delivery_address, delivery_date, suggested_price_per_gallon, total_amount_due)
                    VALUES (?, ?, ?, (SELECT address1 FROM ClientInformation WHERE username = ?), ?, ?, ?)`,
                  [
                    formattedDate,
                    decoded.name,
                    body.gallons,
                    decoded.name,
                    body.date,
                    price_info[0],
                    price_info[1],
                  ],
                  function (error, results, fields) {
                    if (error) {
                      console.error(error);
                      res.status(500).end();
                      return;
                    }
                    if (results.rowCount == 0) {
                      console.log(results.rowCount);
                      return;
                    }
                    res.status(200).redirect("/fuelQuoteForm.html");
                  }
                );
              }
            );
          }
        );
      }
    }
  }
});

fuelQuote.get("/", (req, res) => {
  if (req.cookies.token) {
    let decoded = verifyToken(req.cookies.token);
    if (decoded) {
      connection.query(
        `SELECT * FROM FuelQuote WHERE username = ?;`,
        [decoded.name],
        function (error, results, fields) {
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
          for (let i = 0; i < results.length; i++) {
            response[i + 1] = {
              QuoteDate: results[i].quote_date,
              GallonsRequested: results[i].gallons_requested,
              DeliveryAddress: results[i].delivery_address,
              DeliveryDate: results[i].delivery_date,
              SuggestedPrice: results[i].suggested_price_per_gallon,
              TotalAmount: results[i].total_amount_due,
            };
          }
          console.log(response);
          res.status(200).json(response);
        }
      );
    } else {
      res.status(401).end();
    }
  }
});

module.exports = fuelQuote;

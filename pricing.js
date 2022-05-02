const express = require("express");
const cookieParser = require("cookie-parser");
const {
  verifyToken,
  calcPrice,
  isNumber,
  checkFuelQuoteFormInput,
} = require("./utils.js");
const connection = require("./creds.js");
const pricing = express();
pricing.use(cookieParser());

pricing.post("/getPrice", (req, res) => {
  let user = verifyToken(req.cookies?.token);
  let body = JSON.parse(req.body);
  let gallons = body.gallons;
  let date = body.date;
  // checks if in texas or not (Location factor based on client's address)
  if (
    isNumber(body.gallons) &&
    checkFuelQuoteFormInput(Number(body.gallons), body.date)
  ) {
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
            res.json({
              total_price: price_info[1],
              suggested_price: price_info[0],
              personal_info: results1[0],
            });
          }
        );
      }
    );
  } else {
    res.status(401).end();
  }
});

module.exports = pricing;

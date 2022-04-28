const express = require('express');
const app = express();
const loginModule = require('./login.js');
const registerModule = require('./register.js');
const profileModule = require('./profile.js');
const fuelQuoteModule = require('./fuelquote.js');
const pricingModule = require('./pricing.js');
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.text());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// "Modules"
app.use('/login', loginModule);
app.use('/register', registerModule);
app.use('/profile', profileModule);
app.use('/fuelQuote', fuelQuoteModule);
app.use('/pricing', pricingModule)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

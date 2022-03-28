const jwt = require('jsonwebtoken');
// Utility Functions (Ex: functions that check for length etc)

function checkUsernameCharacters(input) {
  return /^[a-zA-Z0-9!@#$%^&*()]{5,20}$/.test(input);
}

function checkPasswordCharacters(input) {
  return /^[a-zA-Z0-9!@#$%^&*()]{8,}$/.test(input);
}

function checkRegisterInput(username, password) {
  return [...username].length >= 5 && [...username].length <= 20 && [...password].length >= 8;
}

function checkLoginInput(username, password) {
  return [...username].length >= 5 && [...username].length <= 20 && [...password].length >= 8;
}

function checkProfileInput(fullname, address1, city, state, zipcode) {
  return [...fullname].length > 0 && [...fullname].length <= 50 && [...address1].length <= 100 && [...city].length <= 100 && [...state].length == 2 && [...zipcode].length >= 5 && [...zipcode].length <= 9;
}

function checkFuelQuoteFormInput(gallons, deliveryDate) {
  return gallons > 0 && (new Date(deliveryDate).toString()) !== 'Invalid Date';
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.secret);
  } catch (err) {
    console.log(err);
    return null;
  }
}

function isNumber(input) {
  return !(Number.isNaN(Number(input)));
}

exports.checkRegisterInput = checkRegisterInput;
exports.checkLoginInput = checkLoginInput;
exports.checkProfileInput = checkProfileInput;
exports.checkFuelQuoteFormInput = checkFuelQuoteFormInput;
exports.isNumber = isNumber;
exports.checkUsernameCharacters = checkUsernameCharacters;
exports.checkPasswordCharacters = checkPasswordCharacters;
exports.verifyToken = verifyToken;
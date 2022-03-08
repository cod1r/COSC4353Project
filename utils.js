// Utility Functions (Ex: functions that check for length etc)

function checkRegisterInputLengths(username, password) {
  return [...username].length >= 5 && [...username].length <= 20 && [...password].length >= 8;
}

function checkLoginInputLengths(username, password) {
  return [...username].length >= 5 && [...username].length <= 20 && [...password].length >= 8;
}

function checkProfileInputLengths(fullname, address1, city, state, zipcode) {
  return [...fullname].length > 0 && [...fullname].length <= 50 && [...address1].length <= 100 && [...city].length <= 100 && [...state].length == 2 && [...zipcode].length >= 5 && [...zipcode].length <= 9;
}

function checkFuelQuoteFormInputLengths(gallons, deliveryDate) {
  return gallons && (new Date(deliveryDate).toString()) !== 'Invalid Date';
}

function isNumber(input) {
  return !(Number.isNaN(Number(input)));
}

exports.checkRegisterInputLengths = checkRegisterInputLengths;
exports.checkLoginInputLengths = checkLoginInputLengths;
exports.checkProfileInputLengths = checkProfileInputLengths;
exports.checkFuelQuoteFormInputLengths = checkFuelQuoteFormInputLengths;
exports.isNumber = isNumber;
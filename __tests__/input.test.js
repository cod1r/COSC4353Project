// jest tests

const Util = require('../utils.js');

test('checkLoginInput', () => {
  expect(Util.checkLoginInput('', '')).toBe(false);
});

test('checkRegisterInput', () => {
  expect(Util.checkRegisterInput('', '')).toBe(false);
});
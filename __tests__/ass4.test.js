const Util = require('../utils.js');
const jwt = require('jsonwebtoken');

test('verify valid Token', () => {
  let token = jwt.sign({name: 'urmom'}, process.env.secret);
  expect(JSON.stringify(Util.verifyToken(token))).toBe(JSON.stringify(jwt.verify(token, process.env.secret)));
});

test('verify shitty token', () => {
  expect(Util.verifyToken(jwt.sign({name: 'urmom'}, '23423423423'))).toBe(null);
});
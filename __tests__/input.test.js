// jest tests

const Util = require("../utils.js");

test("checkLoginInput - empty case", () => {
  expect(Util.checkLoginInput("", "")).toBe(false);
});

test("checkLoginInput - successfuly case", () => {
  expect(Util.checkLoginInput("billybob", "123456789")).toBe(true);
});

test("checkRegisterInput - empty case", () => {
  expect(Util.checkRegisterInput("", "")).toBe(false);
});

test("checkRegisterInput - successful case", () => {
  expect(Util.checkRegisterInput("billy", "123456789")).toBe(true);
});

test("checkLoginInput - random no worko", () => {
  expect(
    Util.checkLoginInput("ddfsdfasdfasdfasdfas134212341234", "12344566869")
  ).toBe(false);
});

test("checkUsernameCharacters - length 1", () => {
  expect(Util.checkUsernameCharacters("h")).toBe(false);
});

test("checkUsernameCharacters - length 2", () => {
  expect(Util.checkUsernameCharacters("hu")).toBe(false);
});

test("checkUsernameCharacters - length 3", () => {
  expect(Util.checkUsernameCharacters("huh")).toBe(false);
});

test("checkUsernameCharacters - length 4", () => {
  expect(Util.checkUsernameCharacters("what")).toBe(false);
});

test("checkUsernameCharacters - length 21", () => {
  expect(Util.checkUsernameCharacters("beeeeeeeeeeeeeeeeeeep")).toBe(false);
});

test("checkPasswordCharacters - length 1", () => {
  expect(Util.checkPasswordCharacters("B")).toBe(false);
});

test("checkPasswordCharacters - length 2", () => {
  expect(Util.checkPasswordCharacters("uh")).toBe(false);
});

test("checkPasswordCharacters - length 3", () => {
  expect(Util.checkPasswordCharacters("bum")).toBe(false);
});

test("checkPasswordCharacters - length 4", () => {
  expect(Util.checkPasswordCharacters("bruh")).toBe(false);
});

test("checkPasswordCharacters - length 5", () => {
  expect(Util.checkPasswordCharacters("bummy")).toBe(false);
});

test("checkPasswordCharacters - length 6", () => {
  expect(Util.checkPasswordCharacters("Willie")).toBe(false);
});

test("checkPasswordCharacters - length 7", () => {
  expect(Util.checkPasswordCharacters("Huberty")).toBe(false);
});

test("isNumber - using letters", () => {
  expect(Util.isNumber("a")).toBe(false);
});

test("checkFuelQuoteFormInput - using letters for gallons", () => {
  expect(Util.checkFuelQuoteFormInput("a", "1234-12-01")).toBe(false);
});

test("checkFuelQuoteFormInput - incorrect dates", () => {
  expect(Util.checkFuelQuoteFormInput("12", "1234-15-01")).toBe(false);
});

test("checkProfileInput - empty", () => {
  expect(Util.checkProfileInput("", "", "", "", "")).toBe(false);
});

test("checkProfileInput - too long state", () => {
  expect(Util.checkProfileInput("billy", "bob", "", "bo", "77001")).toBe(true);
});

test("checkPrice - correct price", () => {
  expect(Util.calcPrice(0.02, 0.01, 0.02, 10001)).toStrictEqual([
    1.695, 16951.695,
  ]);
});

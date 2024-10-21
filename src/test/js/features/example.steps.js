const {Given, When, Then} = require('@cucumber/cucumber');
const assert = require('assert');

let number1;
let number2;
let result;

Given('I have two numbers {int} and {int}', function (num1, num2) {
    number1 = num1;
    number2 = num2;
});

When('I add the two numbers', function () {
    result = number1 + number2;
});

Then('the result should be {int}', function (expectedResult) {
    assert.strictEqual(result, expectedResult);
});

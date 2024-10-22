const {firefox} = require('playwright');
const {expect} = require('@playwright/test');
const {Given, When, Then} = require('@cucumber/cucumber');
const path = require('path');
const pugHelper = require('../pugHelper')

let data = {
    name: null,
    page: null,
    title: null,
    browser: null,
    context: null,
};

let browserConfig = {headless: false};
let windowConfig = {
    viewport: {width: 2052, height: 1200}
};

Given('page name is {string}', function (name) {
    data.name = name;
});

Given('page is compiled', function () {
    pugHelper.compilePug(data.name);
});

When('it is rendered', async function () {
    const filePath = 'file://' + path.resolve(__dirname, '../../../../dist/' + data.name + ".html");
    console.log("file: " + filePath);
    data.browser = await firefox.launch(browserConfig);
    data.context = await data.browser.newContext(windowConfig);
    data.page = await data.context.newPage();
    await data.page.goto(filePath);
});

Then('title should be {string}', async function (expectedResult) {
    const title = await data.page.title();
    expect(title).toBe(expectedResult);
});

Then('closed', async function () {
    await data.page.close();
    await data.browser.close();
});

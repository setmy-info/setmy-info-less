const {Given, When, Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const pageHelper = require('./pageHelper');

Given('page name is {string}', function (name) {
    pageHelper.pageName(name);
    pageHelper.getPath();
});

When('page is rendered', async function () {
    await pageHelper.pageIsRendered();
});

Then('page should have title {string}', async function (expectedTitle) {
    const title = await pageHelper.data.page.title();
    expect(title).toBe(expectedTitle);
});

Then('page element ID is {string}', async function (elementId) {
    await pageHelper.elementIdIs(elementId);
});

Then('that element margin should be {string}', function (expectedMargin) {
    expect(pageHelper.data.computedStyles.margin).toBe(expectedMargin);
});
/*
Then('xxxx {string}', async function (expectedPadding) {

});

Then('xxxxx {string}', async function (expectedFontFamily) {

});

Then('xxxxxx {string}', async function (expectedFontSize) {

});

Then('xxxxxxx {int}', async function (expectedX) {

});

Then('xxxxxxxx {int}', async function (expectedY) {

});

Then('xxxxxxxxx {int}', async function (expectedwidth) {

});

Then('xxxxxxxxxx {int}', async function (expectedheight) {

});

Then('xxxxxxxxxxx {int}', async function (expectedTop) {

});

Then('xxxxxxxxxxxx {int}', async function (expectedLeft) {

});

Then('xxxxxxxxxxxxx {string}', async function (expectedBackColor) {

});

Then('xxxxxxxxxxxxxx {string}', async function (expectedColor) {

});
*/
Then('page is closed', async function () {
    await pageHelper.pageClose();
});

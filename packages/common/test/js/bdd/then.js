const {Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const pageHelper = require('../pageHelper');

Then('page should have title {string}', async function (expectedTitle) {
    const title = await pageHelper.data.page.title();
    expect(title).toBe(expectedTitle);
});

Then('page element margin should be {string}', function (expectedMargin) {
    expect(pageHelper.data.computedStyles.margin).toBe(expectedMargin);
});

Then('page element padding should be {string}', async function (expectedPadding) {
    expect(pageHelper.data.computedStyles.padding).toBe(expectedPadding);
});

Then('page element font family should be {string}', async function (expectedFontFamily) {
    expect(pageHelper.data.computedStyles.fontFamily).toBe(expectedFontFamily);
});

Then('page element font size should be {string}', async function (expectedFontSize) {
    expect(pageHelper.data.computedStyles.fontSize).toBe(expectedFontSize);
});

Then('page element X should be {int}', async function (expectedX) {
    expect(pageHelper.data.computedStyles.x).toBe(expectedX);
});

Then('page element Y should be {int}', async function (expectedY) {
    expect(pageHelper.data.computedStyles.y).toBe(expectedY);
});

Then('page element WIDTH should be {int}', async function (expectedWidth) {
    expect(pageHelper.data.computedStyles.width).toBe(expectedWidth);
});

Then('page element HEIGHT should be {int}', async function (expectedHeight) {
    expect(pageHelper.data.computedStyles.height).toBe(expectedHeight);
});

Then('page element TOP should be {int}', async function (expectedTop) {
    expect(pageHelper.data.computedStyles.top).toBe(expectedTop);
});

Then('page element LEFT should be {int}', async function (expectedLeft) {
    expect(pageHelper.data.computedStyles.left).toBe(expectedLeft);
});

Then('page element background color should be {string}', async function (expectedBackColor) {
    expect(pageHelper.data.computedStyles.backgroundColor).toBe(expectedBackColor);
});

Then('page element color should be {string}', async function (expectedColor) {
    expect(pageHelper.data.computedStyles.color).toBe(expectedColor);
});

Then('page is closed', async function () {
    await pageHelper.pageClose();
});

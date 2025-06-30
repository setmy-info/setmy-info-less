const {firefox} = require('playwright');
const {expect} = require('@playwright/test');
const {Given, When, Then} = require('@cucumber/cucumber');
const path = require('path');
const pugHelper = require('../pugHelper');
const firefoxHelper = require('../firefoxHelper');

let data = {
    name: null,
    page: null,
    title: null,
    browser: null,
    context: null,
    browserConfig: {
        headless: false,
        firefoxPath: firefoxHelper.getFirefoxPath()
    },
    windowConfig: {
        viewport: {width: 2000, height: 1200}
    }
};

Given('page name is {string}', function (name) {
    data.name = name;
});

When('page is compiled', function () {
    pugHelper.compilePug(data.name, {title: data.name + ".html"});
});

When('page is rendered', async function () {
    const filePath = 'file://' + path.resolve(__dirname, '../../../../dist/' + data.name + ".html");
    console.log("file: " + filePath);
    data.browser = await firefox.launch(data.browserConfig);
    data.context = await data.browser.newContext(data.windowConfig);
    data.page = await data.context.newPage();
    await data.page.goto(filePath);
    //await data.page.waitForLoadState('domcontentloaded');
});

Then('page title should be {string}', async function (expectedResult) {
    const title = await data.page.title();
    expect(title).toBe(expectedResult);
});

Then('coordinates of the element {string} should be {int}, {int} and {int}, {int}.', async function (selector, x, y, x1, y1) {
    const elementHandle = await data.page.$(selector);
    const boundingBox = await elementHandle.boundingBox();

    if (boundingBox) {
        const topLeft = {
            x: boundingBox.x,
            y: boundingBox.y
        };
        const bottomRight = {
            x: boundingBox.x + boundingBox.width,
            y: boundingBox.y + boundingBox.height
        };

        console.log(`Coords: (${x}, ${y}, ${x1}, ${y1})`);
        console.log(`Left top: (${topLeft.x}, ${topLeft.y})`);
        console.log(`Right bottom: (${bottomRight.x}, ${bottomRight.y})`);

        expect(topLeft.x).toEqual(x);
        expect(topLeft.y).toEqual(y);

        expect(bottomRight.x).toEqual(x1);
        expect(bottomRight.y).toEqual(y1);
    } else {
        throw new Error("Element not found!");
    }
});

Then('page is closed', async function () {
    await data.page.close();
    await data.browser.close();
});

Then('element with id {string} should have margin {string}, padding {string}, font {string}, font size {string}, width {int}px, height {int}px, background color {string}, text color {string}',
    async function (elementId, expectedMargin, expectedPadding, expectedFontFamily, expectedFontSize,
                    expectedWidth, expectedHeight, expectedBackgroundColor, expectedTextColor
    ) {
        const selector = `#${elementId}`;
        const elementHandle = await data.page.$(selector);

        if (!elementHandle) {
            throw new Error(`Element with ID '${elementId}' not found`);
        }

        const computedStyles = await data.page.evaluate((sel) => {
            const el = document.querySelector(sel);
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                margin: `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`,
                padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
                fontFamily: style.fontFamily,
                fontSize: style.fontSize,
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                backgroundColor: style.backgroundColor,
                color: style.color
            };
        }, selector);

        console.log("Computed styles:", computedStyles);

        expect(computedStyles.margin).toBe(expectedMargin);
        expect(computedStyles.padding).toBe(expectedPadding);
        expect(computedStyles.fontFamily).toContain(expectedFontFamily); // font-family võib sisaldada fallback'e
        expect(computedStyles.fontSize).toBe(expectedFontSize);
        expect(computedStyles.width).toBe(expectedWidth);
        expect(computedStyles.height).toBe(expectedHeight);
        expect(computedStyles.backgroundColor).toBe(expectedBackgroundColor);
        expect(computedStyles.color).toBe(expectedTextColor);
    });

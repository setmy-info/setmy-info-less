//const pugTranspile = require('./pugTranspile');
const path = require("path");
const {firefox} = require('playwright');
const firefoxHelper = require("./firefoxHelper");
const {expect} = require("@playwright/test");

const data = {
    browserConfig: {
        headless: false,
        firefoxPath: firefoxHelper.getFirefoxPath()
    },
    windowConfig: {
        viewport: {width: 2000, height: 1200}
    },
};

function pageName(name) {
    data.name = name;
}

function getPath() {
    const filePath = 'file://' + path.resolve(__dirname, '../../../dist/' + data.name + '.html');
    data.filePath = filePath;
    return data.filePath;
}

async function pageIsRendered() {
    data.browser = await firefox.launch(data.browserConfig);
    data.context = await data.browser.newContext(data.windowConfig);
    data.page = await data.context.newPage();
    await data.page.goto(data.filePath);
}

async function elementExpectations(elementId, exp) {
    await elementIdIs(elementId);
    expectations(exp);
}

async function elementIdIs(elementId) {
    data.elementId = elementId;
    data.selector = `#${data.elementId}`;
    data.elementHandle = await data.page.$(data.selector);
    if (!data.elementHandle) {
        throw new Error(`Element with ID '${data.elementId}' not found`);
    }
    data.computedStyles = await data.page.evaluate((sel) => {
        const el = document.querySelector(sel);
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const allStyles = {};
        for (let i = 0; i < style.length; i++) {
            const prop = style[i];
            allStyles[prop] = style.getPropertyValue(prop);
        }
        return {
            margin: `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`,
            padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            x: rect.x,
            y: rect.y,
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            backgroundColor: style.backgroundColor,
            color: style.color,
            allStyles: allStyles
        };
    }, data.selector);
}

function expectations(ex) {
    expect(data.computedStyles.margin).toBe(ex.margin);
    expect(data.computedStyles.padding).toBe(ex.padding);
    expect(data.computedStyles.fontFamily).toContain(ex.fontFamily);
    expect(data.computedStyles.fontSize).toBe(ex.fontSize);
    expect(data.computedStyles.width).toBe(ex.width);
    expect(data.computedStyles.height).toBe(ex.height);
    expect(data.computedStyles.backgroundColor).toBe(ex.backgroundColor);
    expect(data.computedStyles.color).toBe(ex.color);
    expect(data.computedStyles.top).toBe(ex.top);
    expect(data.computedStyles.left).toBe(ex.left);
    expect(data.computedStyles.x).toBe(ex.x);
    expect(data.computedStyles.y).toBe(ex.y);
}

module.exports = {
    pageName,
    getPath,
    pageIsRendered,
    elementIdIs,
    data,
    expectations,
    elementExpectations
};


/*
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
    },
    elementId: null,
    selector: null,
    elementHandle: null,
    computedStyles: null
};

Given('page name is {string}', function (name) {
    data.name = name;
});

When('page is compiled', function () {
    pugTranspile.compilePug(data.name, {title: data.name + ".html"});
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

When('element id is {string}', async function (elementId) {
    data.elementId = elementId;
    data.selector = `#${data.elementId}`;
    const elementHandle = await data.page.$(data.selector);
    if (!elementHandle) {
        throw new Error(`Element with ID '${data.elementId}' not found`);
    }
    data.elementHandle = elementHandle;
    data.computedStyles = await data.page.evaluate((sel) => {
        const el = document.querySelector(sel);
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const allStyles = {};
        for (let i = 0; i < style.length; i++) {
            const prop = style[i];
            allStyles[prop] = style.getPropertyValue(prop);
        }
        return {
            margin: `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`,
            padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            backgroundColor: style.backgroundColor,
            color: style.color,
            allStyles: allStyles
        };
    }, data.selector);
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

Then('element with id {string} should have margin {string}, padding {string}, font {string}, font size {string}, top {int}px, left {int}px, width {int}px, height {int}px, background color {string}, text color {string}',
    async function (elementId, expectedMargin, expectedPadding, expectedFontFamily, expectedFontSize,
                    expectedTop, expectedLeft,
                    expectedWidth, expectedHeight,
                    expectedBackgroundColor, expectedTextColor
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
            const allStyles = {};
            for (let i = 0; i < style.length; i++) {
                const prop = style[i];
                allStyles[prop] = style.getPropertyValue(prop);
            }
            return {
                margin: `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`,
                padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
                fontFamily: style.fontFamily,
                fontSize: style.fontSize,
                top: Math.round(rect.top),
                left: Math.round(rect.left),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                backgroundColor: style.backgroundColor,
                color: style.color,
                allStyles: allStyles
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


Then('element should have margin {string}, padding {string}, font {string}, font size {string}, top {int}px, left {int}px, width {int}px, height {int}px, background color {string}, text color {string}',
    async function (expectedMargin, expectedPadding, expectedFontFamily, expectedFontSize,
                    expectedTop, expectedLeft,
                    expectedWidth, expectedHeight,
                    expectedBackgroundColor, expectedTextColor
    ) {
        console.log("Computed styles:", data.computedStyles);
        expect(data.computedStyles.margin).toBe(expectedMargin);
        expect(data.computedStyles.padding).toBe(expectedPadding);
        expect(data.computedStyles.fontFamily).toContain(expectedFontFamily); // font-family võib sisaldada fallback'e
        expect(data.computedStyles.fontSize).toBe(expectedFontSize);
        expect(data.computedStyles.width).toBe(expectedWidth);
        expect(data.computedStyles.height).toBe(expectedHeight);
        expect(data.computedStyles.backgroundColor).toBe(expectedBackgroundColor);
        expect(data.computedStyles.color).toBe(expectedTextColor);
    });
*/

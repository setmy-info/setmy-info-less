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

async function pageClose() {
    await data.page.close();
    await data.browser.close();
}

module.exports = {
    pageName,
    getPath,
    pageIsRendered,
    elementIdIs,
    data,
    expectations,
    elementExpectations,
    pageClose
};

const path = require('path');
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const express = require('express');
const http = require('http');

const SELENIUM_HUB_URL = process.env.SELENIUM_HUB_URL || 'http://localhost:4444/wd/hub';
const BROWSER = process.env.SELENIUM_BROWSER || 'firefox';
const WINDOW_WIDTH = 2000;
const WINDOW_HEIGHT = 1200;

const data = {};

function pageName(name) {
    data.name = name;
}

function getPath() {
    const url = `http://localhost:${data.serverPort}/${data.packageName}/dist/${data.name}.html`;
    data.url = url;
    return url;
}

async function startServer() {
    // Serve from packages/ root so cross-package CSS references like ../../setmy-info-less/dist/main.css resolve correctly
    const packagesRoot = path.resolve(process.cwd(), '..');
    const app = express();
    app.use(express.static(packagesRoot));
    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    data.server = server;
    data.serverPort = server.address().port;
    data.packageName = path.basename(process.cwd());
}

async function pageIsRendered() {
    await startServer();
    getPath();

    const options = new firefox.Options();
    data.driver = await new Builder()
        .usingServer(SELENIUM_HUB_URL)
        .forBrowser(BROWSER)
        .setFirefoxOptions(options)
        .build();

    await data.driver.manage().setTimeouts({ pageLoad: 30000, implicit: 5000 });
    // Set initial window size then compensate for browser chrome to get exact viewport
    await data.driver.manage().window().setRect({ width: WINDOW_WIDTH, height: WINDOW_HEIGHT });
    await data.driver.get('about:blank');
    const viewport = await data.driver.executeScript(
        'return { w: window.innerWidth, h: window.innerHeight };'
    );
    const wDiff = WINDOW_WIDTH - viewport.w;
    const hDiff = WINDOW_HEIGHT - viewport.h;
    if (wDiff !== 0 || hDiff !== 0) {
        await data.driver.manage().window().setRect({
            width: WINDOW_WIDTH + wDiff,
            height: WINDOW_HEIGHT + hDiff
        });
    }
    await data.driver.get(data.url);
}

async function getTitle() {
    return data.driver.getTitle();
}

async function elementIdIs(elementId) {
    data.elementId = elementId;
    const selector = `#${elementId}`;
    data.computedStyles = await data.driver.executeScript(
        'var el = document.querySelector(arguments[0]);' +
        'if (!el) return null;' +
        'var style = window.getComputedStyle(el);' +
        'var rect = el.getBoundingClientRect();' +
        'var allStyles = {};' +
        'for (var i = 0; i < style.length; i++) { var p = style[i]; allStyles[p] = style.getPropertyValue(p); }' +
        'return {' +
        '  margin: style.marginTop + " " + style.marginRight + " " + style.marginBottom + " " + style.marginLeft,' +
        '  padding: style.paddingTop + " " + style.paddingRight + " " + style.paddingBottom + " " + style.paddingLeft,' +
        '  fontFamily: style.fontFamily,' +
        '  fontSize: style.fontSize,' +
        '  x: rect.x,' +
        '  y: rect.y,' +
        '  top: Math.round(rect.top),' +
        '  left: Math.round(rect.left),' +
        '  width: Math.round(rect.width),' +
        '  height: Math.round(rect.height),' +
        '  backgroundColor: style.backgroundColor,' +
        '  color: style.color,' +
        '  allStyles: allStyles' +
        '};',
        selector
    );
    if (!data.computedStyles) {
        throw new Error(`Element '${elementId}' not found`);
    }
}

function expectations(ex) {
    /* global expect */
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

async function elementExpectations(elementId, exp) {
    await elementIdIs(elementId);
    expectations(exp);
}

async function pageClose() {
    if (data.driver) {
        try { await data.driver.quit(); } catch (_) {}
        data.driver = null;
    }
    if (data.server) {
        await new Promise((resolve) => data.server.close(resolve));
        data.server = null;
    }
}

module.exports = {
    pageName,
    getPath,
    pageIsRendered,
    elementIdIs,
    data,
    expectations,
    elementExpectations,
    pageClose,
    getTitle
};

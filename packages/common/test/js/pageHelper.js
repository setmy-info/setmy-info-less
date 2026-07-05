const path = require('path');
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const express = require('express');
const http = require('http');

const SELENIUM_HUB_URL = process.env.SELENIUM_HUB_URL || 'http://localhost:4444/wd/hub';
const BROWSER = process.env.SELENIUM_BROWSER || 'firefox';
const WINDOW_WIDTH = 2000;
const WINDOW_HEIGHT = 1200;

// Hard caps so cleanup in pageClose() can never hang the test runner (see review3.md §7.2).
const QUIT_TIMEOUT_MS = Number(process.env.SELENIUM_QUIT_TIMEOUT_MS) || 15000;
const SERVER_CLOSE_TIMEOUT_MS = Number(process.env.SERVER_CLOSE_TIMEOUT_MS) || 10000;

const data = {};

// Race a promise against a timeout. Resolves (never rejects) so a stuck quit()/close() is logged
// and skipped rather than blocking afterAll forever. Returns true if it finished, false on timeout.
function withTimeout(promise, ms, label) {
    let timer;
    const timeout = new Promise((resolve) => {
        timer = setTimeout(() => {
            console.warn(`pageHelper: ${label} did not finish within ${ms}ms — continuing without waiting.`);
            resolve(false);
        }, ms);
    });
    return Promise.race([
        Promise.resolve(promise).then(() => true, (err) => {
            console.warn(`pageHelper: ${label} failed: ${err && err.message ? err.message : err}`);
            return true;
        }),
        timeout
    ]).finally(() => clearTimeout(timer));
}

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
    // Track live sockets so pageClose() can force them shut — server.close() alone waits for
    // keep-alive connections (e.g. one Firefox holds open) to drain and can otherwise hang forever.
    const sockets = new Set();
    server.on('connection', (socket) => {
        sockets.add(socket);
        socket.on('close', () => sockets.delete(socket));
    });
    await new Promise((resolve) => server.listen(0, resolve));
    data.server = server;
    data.sockets = sockets;
    data.serverPort = server.address().port;
    data.packageName = path.basename(process.cwd());
}

async function pageIsRendered() {
    // Defensive: if a previous render's driver/server is still open (failed scenario, double
    // render), close it before overwriting the references — otherwise it leaks unreachably:
    // the orphaned grid session counts against the hub's max-session cap and the orphaned
    // server handle keeps the Node process alive after the run.
    await pageClose();

    await startServer();
    getPath();

    const options = new firefox.Options();
    data.driver = await new Builder()
        .usingServer(SELENIUM_HUB_URL)
        .forBrowser(BROWSER)
        .setFirefoxOptions(options)
        .build();

    await data.driver.manage().setTimeouts({ pageLoad: 30000, implicit: 5000 });
    await data.driver.get('about:blank');
    await setViewport(WINDOW_WIDTH, WINDOW_HEIGHT);
    await data.driver.get(data.url);
}

// Resize the window so the INNER viewport is exactly width x height. Selenium's setRect sizes the
// outer window, so we measure the resulting innerWidth/innerHeight and re-apply the chrome delta.
// Use this to drive responsive media-query tests (media queries react to resize without a reload).
async function setViewport(width, height) {
    await data.driver.manage().window().setRect({ width, height });
    const viewport = await data.driver.executeScript(
        'return { w: window.innerWidth, h: window.innerHeight };'
    );
    const wDiff = width - viewport.w;
    const hDiff = height - viewport.h;
    if (wDiff !== 0 || hDiff !== 0) {
        await data.driver.manage().window().setRect({
            width: width + wDiff,
            height: height + hDiff
        });
    }
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
    // Always release the Selenium session — a leaked session counts against the grid's max-session
    // cap and is the most likely cause of later runs hanging on Builder().build(). Bounded so a
    // stuck quit() against an unhealthy node can't hang afterAll.
    if (data.driver) {
        await withTimeout(data.driver.quit(), QUIT_TIMEOUT_MS, 'driver.quit()');
        data.driver = null;
    }
    if (data.server) {
        const server = data.server;
        const sockets = data.sockets;
        // Force lingering connections shut first so server.close() can actually complete.
        if (typeof server.closeAllConnections === 'function') {
            server.closeAllConnections();
        } else if (sockets) {
            for (const socket of sockets) {
                socket.destroy();
            }
        }
        if (sockets) {
            sockets.clear();
        }
        await withTimeout(
            new Promise((resolve) => server.close(resolve)),
            SERVER_CLOSE_TIMEOUT_MS,
            'server.close()'
        );
        data.server = null;
        data.sockets = null;
    }
}

module.exports = {
    pageName,
    getPath,
    pageIsRendered,
    setViewport,
    elementIdIs,
    data,
    expectations,
    elementExpectations,
    pageClose,
    getTitle
};

const path = require("path");
const dgram = require("node:dgram");
const os = require("node:os");
const { Builder, By } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const express = require("express");
const http = require("http");

// The Selenium Grid is a separate machine (selenium.gintra), not this one. Override with
// SELENIUM_HUB_URL to point at a local standalone grid, e.g.
// SELENIUM_HUB_URL=http://localhost:4444/wd/hub.
const SELENIUM_HUB_URL =
    process.env.SELENIUM_HUB_URL || "http://selenium.gintra:4444/wd/hub";
// Host the GRID NODE uses to fetch the fixture pages from the ephemeral server below. It must be
// an address that resolves and routes FROM THE NODE: "localhost" there is the node's own loopback,
// where nothing is listening, so with a remote hub every page load would fail with a connection
// error that looks like a broken fixture. Left empty it is derived in resolvePageHost().
const PAGE_HOST = process.env.E2E_PAGE_HOST || "";
// Fixed port for that server, so a remote grid only needs one hole in this machine's firewall.
// 0 (the default) takes any free port, which is fine when the browser runs here.
const PAGE_PORT = Number(process.env.E2E_PAGE_PORT) || 0;
const BROWSER = process.env.SELENIUM_BROWSER || "firefox";
// Optional path to a specific Gecko-based browser binary (e.g. LibreWolf) instead of the node's
// default Firefox. The path is resolved ON THE GRID NODE, not on the machine running Jest.
const BROWSER_BINARY = process.env.SELENIUM_BROWSER_BINARY || "";
// Optional path to an existing browser profile directory to reuse instead of the throwaway profile
// geckodriver builds per session. Use it when a machine-installed extension (e.g. Web eID on
// Open-EID machines) must be accepted once by hand and then stay accepted. Also resolved ON THE
// GRID NODE. The profile is used in place, so no other browser may hold it open during a run.
const BROWSER_PROFILE = process.env.SELENIUM_BROWSER_PROFILE || "";
// Run the browser HEADLESS (the default) so an e2e run does not steal focus or open windows on the
// grid node's desktop, and so the same command works on a headless CI agent. Set
// SELENIUM_HEADLESS=false (or 0/no/off) to get visible windows back when a layout has to be WATCHED
// rather than only asserted. Headless Gecko renders through the same layout engine, so geometry,
// fonts and computed styles — what these tests assert — are unchanged.
const HEADLESS = !/^(0|false|no|off)$/i.test(
    process.env.SELENIUM_HEADLESS ?? "true",
);
const WINDOW_WIDTH = 2000;
const WINDOW_HEIGHT = 1200;

// Hard caps so cleanup in pageClose() can never hang the test runner (see review3.md §7.2).
const QUIT_TIMEOUT_MS = Number(process.env.SELENIUM_QUIT_TIMEOUT_MS) || 15000;
const SERVER_CLOSE_TIMEOUT_MS =
    Number(process.env.SERVER_CLOSE_TIMEOUT_MS) || 10000;

const data = {};

// Race a promise against a timeout. Resolves (never rejects) so a stuck quit()/close() is logged
// and skipped rather than blocking afterAll forever. Returns true if it finished, false on timeout.
function withTimeout(promise, ms, label) {
    let timer;
    const timeout = new Promise((resolve) => {
        timer = setTimeout(() => {
            console.warn(
                `pageHelper: ${label} did not finish within ${ms}ms — continuing without waiting.`,
            );
            resolve(false);
        }, ms);
    });
    return Promise.race([
        Promise.resolve(promise).then(
            () => true,
            (err) => {
                console.warn(
                    `pageHelper: ${label} failed: ${err && err.message ? err.message : err}`,
                );
                return true;
            },
        ),
        timeout,
    ]).finally(() => clearTimeout(timer));
}

function pageName(name) {
    data.name = name;
}

function packagesRoot() {
    // This file lives in scripts/. Serving packages/ (not process.cwd()) is
    // required: jest runs from the repository root, while the URL and the
    // Pug fixtures' cross-package CSS hrefs are rooted at packages/.
    return path.resolve(__dirname, "..", "packages");
}

function packageNameFromStack(stack) {
    const match = String(stack).match(/[/\\]packages[/\\]([^/\\]+)[/\\]/);
    if (!match) {
        throw new Error(
            "pageHelper: cannot infer which package this test belongs to (no packages/<name>/ in the stack)",
        );
    }
    return match[1];
}

// Prefer Jest's test file path: Gherkin steps run inside scripts/gherkin/runner.cjs,
// so Error().stack never contains packages/<name>/. Direct *.e2e.js files do.
function inferPackageName() {
    let testPath = "";
    try {
        testPath =
            (typeof expect !== "undefined" && expect.getState?.().testPath) ||
            "";
    } catch {
        testPath = "";
    }
    return packageNameFromStack(`${testPath}\n${new Error().stack}`);
}

function getPath() {
    const url = `http://${data.pageHost}:${data.serverPort}/${data.packageName}/dist/${data.name}.html`;
    data.url = url;
    return url;
}

function hubHostname() {
    try {
        return new URL(SELENIUM_HUB_URL).hostname;
    } catch {
        return "localhost";
    }
}

function isLoopbackHost(host) {
    return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

// First non-internal IPv4 of this machine, preferring a real LAN interface: a container bridge
// (docker0 at 172.17.0.1 here) is up but routes nowhere useful for an external grid node.
function firstExternalIPv4() {
    const interfaces = Object.entries(os.networkInterfaces());
    const candidates = [];
    for (const [name, addresses] of interfaces) {
        for (const address of addresses ?? []) {
            if (address.family === "IPv4" && !address.internal) {
                candidates.push({ name, address: address.address });
            }
        }
    }
    const lan = candidates.find(
        (candidate) =>
            !/^(docker|br-|veth|virbr|podman|cni)/.test(candidate.name),
    );
    return (lan ?? candidates[0])?.address ?? "localhost";
}

// The local address on the route toward `host`, which is what the grid node must call back on.
// A connected UDP socket is the cheap way to ask the kernel: connect() on a datagram socket only
// fixes the peer and selects the route, it sends no packet, so this answers even while the grid
// itself is down — it just has to RESOLVE.
function localAddressToward(host) {
    return new Promise((resolve) => {
        let socket;
        const fallback = () => {
            try {
                socket?.close();
            } catch {
                /* already closed */
            }
            resolve(firstExternalIPv4());
        };
        try {
            socket = dgram.createSocket("udp4");
        } catch {
            resolve(firstExternalIPv4());
            return;
        }
        socket.once("error", fallback);
        try {
            socket.connect(53, host, () => {
                let address;
                try {
                    address = socket.address().address;
                } catch {
                    address = undefined;
                }
                socket.close();
                resolve(
                    address && address !== "0.0.0.0"
                        ? address
                        : firstExternalIPv4(),
                );
            });
        } catch {
            fallback();
        }
    });
}

async function resolvePageHost() {
    if (PAGE_HOST) {
        return PAGE_HOST;
    }
    // A grid on this machine reaches the server over loopback, which needs no interface guessing
    // and keeps working on a laptop with no network at all.
    if (isLoopbackHost(hubHostname())) {
        return "localhost";
    }
    return localAddressToward(hubHostname());
}

async function startServer() {
    // Serve from packages/ root so cross-package CSS references like
    // ../../setmy-info-less/dist/main.css resolve, and so
    // /<package>/dist/<page>.html maps onto packages/<package>/dist/.
    const root = packagesRoot();
    const app = express();
    app.use(express.static(root));
    const server = http.createServer(app);
    // Track live sockets so pageClose() can force them shut — server.close() alone waits for
    // keep-alive connections (e.g. one Firefox holds open) to drain and can otherwise hang forever.
    const sockets = new Set();
    server.on("connection", (socket) => {
        sockets.add(socket);
        socket.on("close", () => sockets.delete(socket));
    });
    // No host argument: bind every interface, so a browser on the grid node can reach the page
    // and not only a browser on this machine.
    await new Promise((resolve) => server.listen(PAGE_PORT, resolve));
    data.server = server;
    data.sockets = sockets;
    data.serverPort = server.address().port;
    data.pageHost = await resolvePageHost();
    data.packageName = inferPackageName();
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
    if (HEADLESS) {
        // Gecko's own single-dash flag. selenium-webdriver dropped Options#setHeadless in 4.10,
        // so the argument is the supported route; it is also what the Chromium-side
        // "--headless" maps to, should BROWSER ever be switched.
        options.addArguments("-headless");
    }
    if (BROWSER_BINARY) {
        options.setBinary(BROWSER_BINARY);
    }
    if (BROWSER_PROFILE) {
        options.addArguments("-profile", BROWSER_PROFILE);
    }
    // LibreWolf ships privacy.spoof_english=0 ("ask"), so on the first real page load it raises a
    // confirmEx dialog offering to request English versions of pages. Any dialog aborts the next
    // WebDriver command with UnexpectedAlertOpenError and fails the suite. 2 = always request
    // English, which also pins Accept-Language for reproducible rendering. Inert on stock Firefox.
    options.setPreference("privacy.spoof_english", 2);
    // Pin devicePixelRatio to 1 so pixel assertions do not depend on the display scaling of the
    // machine running the browser. Firefox snaps border widths to whole DEVICE pixels, so at 125%
    // scaling a 2px border computes as 1.6px (2 * 1.25 = 2.5 -> floor 2 -> 2 / 1.25) and breaks
    // e.g. the .card border test. Padding and border-radius are not snapped, hence only borders
    // appeared to "randomly" fail.
    options.setPreference("layout.css.devPixelsPerPx", "1.0");
    data.driver = await new Builder()
        .usingServer(SELENIUM_HUB_URL)
        .forBrowser(BROWSER)
        .setFirefoxOptions(options)
        .build();

    await data.driver.manage().setTimeouts({ pageLoad: 30000, implicit: 5000 });
    await data.driver.get("about:blank");
    await setViewport(WINDOW_WIDTH, WINDOW_HEIGHT);
    await data.driver.get(data.url);
}

// Resize the window so the INNER viewport is exactly width x height. Selenium's setRect sizes the
// outer window, so we measure the resulting innerWidth/innerHeight and re-apply the chrome delta.
// Use this to drive responsive media-query tests (media queries react to resize without a reload).
async function setViewport(width, height) {
    await data.driver.manage().window().setRect({ width, height });
    const viewport = await data.driver.executeScript(
        "return { w: window.innerWidth, h: window.innerHeight };",
    );
    const wDiff = width - viewport.w;
    const hDiff = height - viewport.h;
    if (wDiff !== 0 || hDiff !== 0) {
        await data.driver
            .manage()
            .window()
            .setRect({
                width: width + wDiff,
                height: height + hDiff,
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
        "var el = document.querySelector(arguments[0]);" +
            "if (!el) return null;" +
            "var style = window.getComputedStyle(el);" +
            "var rect = el.getBoundingClientRect();" +
            "var allStyles = {};" +
            "for (var i = 0; i < style.length; i++) { var p = style[i]; allStyles[p] = style.getPropertyValue(p); }" +
            // getComputedStyle's INDEXED list enumerates longhands only, so a shorthand asserted
            // by name is simply absent from allStyles and reads back as undefined — an assertion
            // failure that looks like broken CSS but is not. Which properties count as shorthands
            // is a moving target: Firefox 155 turned `vertical-align` into one (for
            // baseline-source / alignment-baseline / baseline-shift, CSS Inline Layout 3), so a
            // test that had passed for releases started failing on a browser upgrade alone.
            // getPropertyValue() resolves shorthands regardless, so backfill the ones tests are
            // likely to name. Unknown/unsupported properties return "" and are skipped.
            "var shorthands = ['vertical-align', 'margin', 'padding', 'border', 'border-width'," +
            " 'border-style', 'border-color', 'border-radius', 'background', 'font', 'flex'," +
            " 'flex-flow', 'gap', 'grid', 'grid-area', 'grid-template', 'inset', 'overflow'," +
            " 'place-items', 'place-content', 'list-style', 'transition', 'animation'," +
            " 'text-decoration', 'outline', 'columns'];" +
            "for (var j = 0; j < shorthands.length; j++) {" +
            "  var sp = shorthands[j];" +
            "  if (allStyles[sp] === undefined) {" +
            "    var sv = style.getPropertyValue(sp);" +
            '    if (sv !== "" && sv !== null) { allStyles[sp] = sv; }' +
            "  }" +
            "}" +
            "return {" +
            '  margin: style.marginTop + " " + style.marginRight + " " + style.marginBottom + " " + style.marginLeft,' +
            '  padding: style.paddingTop + " " + style.paddingRight + " " + style.paddingBottom + " " + style.paddingLeft,' +
            "  fontFamily: style.fontFamily," +
            "  fontSize: style.fontSize," +
            "  x: rect.x," +
            "  y: rect.y," +
            "  top: Math.round(rect.top)," +
            "  left: Math.round(rect.left)," +
            "  width: Math.round(rect.width)," +
            "  height: Math.round(rect.height)," +
            "  backgroundColor: style.backgroundColor," +
            "  color: style.color," +
            "  allStyles: allStyles" +
            "};",
        selector,
    );
    if (!data.computedStyles) {
        throw new Error(`Element '${elementId}' not found`);
    }
}

// Click an element by id and wait for the click handler to have run. Used by the pages that
// carry a plain-JS behaviour helper (e.g. the Angular start project's side navigation), so an
// e2e test can measure the CSS of the open state as well as the closed one.
async function clickElementId(elementId) {
    const element = await data.driver.findElement(By.css(`#${elementId}`));
    await element.click();
    // The helpers are synchronous DOM code; one round trip is enough to order the next command
    // after the handler, without a fixed sleep.
    await data.driver.executeScript("return document.readyState;");
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
        await withTimeout(data.driver.quit(), QUIT_TIMEOUT_MS, "driver.quit()");
        data.driver = null;
    }
    if (data.server) {
        const server = data.server;
        const sockets = data.sockets;
        // Force lingering connections shut first so server.close() can actually complete.
        if (typeof server.closeAllConnections === "function") {
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
            "server.close()",
        );
        data.server = null;
        data.sockets = null;
    }
}

module.exports = {
    pageName,
    getPath,
    hubHostname,
    isLoopbackHost,
    firstExternalIPv4,
    resolvePageHost,
    pageIsRendered,
    setViewport,
    elementIdIs,
    clickElementId,
    data,
    expectations,
    elementExpectations,
    pageClose,
    getTitle,
    packagesRoot,
    packageNameFromStack,
    inferPackageName,
};

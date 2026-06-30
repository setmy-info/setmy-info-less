/*
LEGACY / UNUSED — retained intentionally, not wired into the current test run.

This helper returns a local Firefox binary path. It dates from the Playwright era, when e2e
tests launched a local browser executable. The suite now runs against an external Selenium Grid
(see pageHelper.js + jest.e2e.config.js), so no local Firefox path is needed and nothing imports
this file. It is kept as a reference in case a local-browser fallback is ever reintroduced.
Do not delete without confirming no future local-driver work depends on it.
*/
const os = require('os');
const path = require('path');

function getFirefoxPath() {
    let firefoxPath;
    if (os.platform() === 'win32') {
        firefoxPath = path.join('C:', 'Program Files', 'Mozilla Firefox', 'firefox.exe');
    } else if (os.platform() === 'linux') {
        firefoxPath = '/opt/firefox/firefox';
    }
    console.log("Firefox path: ", firefoxPath)
    return firefoxPath;
}

module.exports = {
    getFirefoxPath
};

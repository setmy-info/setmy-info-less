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

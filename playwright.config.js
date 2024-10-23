const {defineConfig} = require('@playwright/test');
const firefoxHelper = require('./src/test/js/firefoxHelper');

const firefoxPath = firefoxHelper.getFirefoxPath();

module.exports = defineConfig({
    testDir: 'src/test/js',
    timeout: 30000,
    retries: 1,
    use: {
        headless: false,
        browserName: 'firefox',
        executablePath: firefoxPath
    },
    testMatch: '**/*.e2e.js'
});

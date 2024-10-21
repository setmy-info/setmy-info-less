const {defineConfig} = require('@playwright/test');

module.exports = defineConfig({
    testDir: 'src/test/js',
    timeout: 30000,
    retries: 1,
    use: {
        headless: false,
        browserName: 'firefox'
    },
    testMatch: '**/*.e2e.js'
});

module.exports = {
    // E2E tier: Selenium against a real browser via the external grid.
    // maxWorkers: 1 - the grid has a session cap and pageHelper keeps
    // module-level state (see review3.md).
    testMatch: ["**/src/test/js/e2e/**/*.e2e.js"],
    testTimeout: 60000,
    maxWorkers: 1,
};

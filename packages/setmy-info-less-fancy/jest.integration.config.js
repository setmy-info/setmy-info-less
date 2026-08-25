module.exports = {
    // Integration tier: asserts against the BUILT artifact (dist/main.css),
    // never against LESS source - Maven `integration-test`.
    testMatch: ["**/src/test/js/integration/**/*.test.js"],
};

const {setDefaultTimeout, After} = require('@cucumber/cucumber');
const pageHelper = require('../pageHelper');

setDefaultTimeout(30000);

/*
Always release the Selenium session and the fixture HTTP server, even when a step failed.

Cucumber skips the remaining steps of a scenario after a failure — including the
"And page is closed" cleanup step — so without this hook a red scenario leaks its grid
session (counting against the grid's max-session cap) and leaves the Express server
listening, whose open handle keeps the Node event loop alive and makes cucumber-js hang
after printing results. pageClose() is idempotent, so scenarios that already closed via
the "page is closed" step are unaffected.
*/
After(async function () {
    await pageHelper.pageClose();
});

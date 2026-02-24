const {When} = require('@cucumber/cucumber');
const pageHelper = require('../pageHelper');

When('page is rendered', async function () {
    await pageHelper.pageIsRendered();
});

When('page element ID is {string}', async function (elementId) {
    await pageHelper.elementIdIs(elementId);
});

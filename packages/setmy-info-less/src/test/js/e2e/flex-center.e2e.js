const {test, expect} = require('@playwright/test');
const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

test.describe(pageName + ' page layout tests', async () => {

    test.beforeAll(async () => {
        pageHelper.pageName(pageName);
        pageHelper.getPath();
        await pageHelper.pageIsRendered();
    });

    test('should load the page and check title', async () => {
        const title = await pageHelper.data.page.title();
        expect(title).toBe('flex-center.html');
    });
});

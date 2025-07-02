const {test, expect} = require('@playwright/test');
const pageHelper = require('./pageHelper');

const pageName = 'flex-center';

test.describe('flex-center page layout tests', async () => {

    test.beforeAll(async () => {
        pageHelper.pageName(pageName);
        pageHelper.getPath();
        pageHelper.pageIsCompiled();
        await pageHelper.pageIsRendered();
    });

    test('should load the page and check title', async () => {
        const title = await pageHelper.data.page.title();
        expect(title).toBe('flex-center.html');
    });
});

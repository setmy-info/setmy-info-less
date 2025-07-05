const {test, expect} = require('@playwright/test');
const pageHelper = require('../pageHelper');

const pageName = 'layoutCenterBox';

test.describe('layoutCenterBox page layout tests', async () => {

    test.beforeAll(async () => {
        pageHelper.pageName(pageName);
        pageHelper.getPath();
        await pageHelper.pageIsRendered();
    });

    test('should load the page and check title', async () => {

        const title = await pageHelper.data.page.title();
        expect(title).toBe('layoutCenterBox.html');

        await pageHelper.elementExpectations(
            'centerBox',
            {
                margin: '0px 488px 0px 488px',
                padding: '0px 0px 0px 0px',
                fontFamily: 'DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif',
                fontSize: '16px',
                x: 488,// (2000-1024) / 2 = 488
                y: 0,
                width: 1024,
                height: 0,
                top: 0,
                left: 488,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'rgb(0, 0, 0)'
            }
        );
    });
});

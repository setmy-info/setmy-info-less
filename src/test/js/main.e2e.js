const {test, expect} = require('@playwright/test');
const pageHelper = require('./pageHelper');

const pageName = 'main';

test.describe('Main page layout tests', async () => {

    test.beforeAll(async () => {
        pageHelper.pageName(pageName);
        pageHelper.getPath();
        pageHelper.pageIsCompiled();
        await pageHelper.pageIsRendered();
    });

    test('should load the page and check title', async () => {

        const title = await pageHelper.data.page.title();
        expect(title).toBe('main.html');

        await pageHelper.elementExpectations(
            'body',
            {
                margin: '0px 0px 0px 0px',
                padding: '0px 0px 0px 0px',
                fontFamily: 'DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif',
                fontSize: '16px',
                width: 2000,
                height: 1200,
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'rgb(0, 0, 0)'
            }
        );

        await pageHelper.elementExpectations(
            'application',
            {
                margin: '0px 0px 0px 0px',
                padding: '0px 0px 0px 0px',
                fontFamily: 'DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif',
                fontSize: '16px',
                width: 2000,
                height: 1200,
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'rgb(0, 0, 0)'
            }
        );
    });
});

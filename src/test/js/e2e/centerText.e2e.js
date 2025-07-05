const {test, expect} = require('@playwright/test');
const pageHelper = require('../pageHelper');

const pageName = 'centerText';

test.describe('centerText page layout tests', async () => {

    test.beforeAll(async () => {
        pageHelper.pageName(pageName);
        pageHelper.getPath();
        await pageHelper.pageIsRendered();
    });

    test('should load the page and check title', async () => {

        const title = await pageHelper.data.page.title();
        expect(title).toBe('centerText.html');

        await pageHelper.elementExpectations(
            'centerText',
            {
                margin: '0px 0px 0px 0px',
                padding: '0px 0px 0px 0px',
                fontFamily: 'DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif',
                fontSize: '16px',
                x: 0,
                y: 0,
                width: 2000,
                height: 19,
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'rgb(0, 0, 0)'
            }
        );

        await pageHelper.elementExpectations(
            'spanCenterText',
            {
                margin: '0px 0px 0px 0px',
                padding: '0px 0px 0px 0px',
                fontFamily: 'DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif',
                fontSize: '16px',
                x: 961.25,
                y: 0,
                width: 77,
                height: 19,
                top: 0,
                left: 961,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'rgb(0, 0, 0)'
            }
        );
    });
});

const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

describe(pageName + ' page layout tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {

        const title = await pageHelper.getTitle();
        expect(title).toBe('application.html');

        await pageHelper.elementExpectations(
            'body',
            {
                margin: '0px 0px 0px 0px',
                padding: '0px 0px 0px 0px',
                fontFamily: 'DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif',
                fontSize: '16px',
                x: 0,
                y: 0,
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
                x: 0,
                y: 0,
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

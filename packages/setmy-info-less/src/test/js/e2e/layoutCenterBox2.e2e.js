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
        expect(title).toBe('layoutCenterBox2.html');

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
                height: 100,
                top: 0,
                left: 488,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'rgb(0, 0, 0)'
            }
        );
    });
});

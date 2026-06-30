const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

describe(pageName + ' card tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('card.html');
    });

    test('.card has padding, white background, and bordered radius', async () => {
        await pageHelper.elementIdIs('card');
        const cs = pageHelper.data.computedStyles;
        expect(cs.padding).toBe('20px 20px 20px 20px');
        expect(cs.backgroundColor).toBe('rgb(255, 255, 255)');
        expect(cs.allStyles['border-top-width']).toBe('2px');
        expect(cs.allStyles['border-top-color']).toBe('rgb(204, 204, 204)');
        expect(cs.allStyles['border-top-left-radius']).toBe('6px');
    });
});

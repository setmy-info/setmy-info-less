const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

describe(pageName + ' section tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('section.html');
    });

    test('.pageSectionNarrow is width-constrained with vertical padding', async () => {
        await pageHelper.elementIdIs('section');
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles['max-width']).toBe('1024px');
        expect(cs.allStyles.width).toBe('1024px');
        expect(cs.padding).toBe('20px 10px 20px 10px');
    });
});

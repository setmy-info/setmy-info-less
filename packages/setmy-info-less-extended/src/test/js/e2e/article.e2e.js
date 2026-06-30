const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

describe(pageName + ' article tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('article.html');
    });

    test('.articleBody uses the relaxed line-height and base text color', async () => {
        await pageHelper.elementIdIs('article');
        const cs = pageHelper.data.computedStyles;
        // line-height @articleLineHeight (1.7) * 16px = 27.2px
        expect(cs.allStyles['line-height']).toBe('27.2px');
        expect(cs.fontSize).toBe('16px');
        expect(cs.color).toBe('rgb(0, 0, 0)');
    });
});

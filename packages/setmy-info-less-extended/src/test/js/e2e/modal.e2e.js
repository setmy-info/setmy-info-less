const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

describe(pageName + ' modal tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('modal.html');
    });

    test('.overlay covers the full viewport with a dim background', async () => {
        await pageHelper.elementIdIs('overlay');
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.position).toBe('fixed');
        expect(cs.top).toBe(0);
        expect(cs.left).toBe(0);
        expect(cs.width).toBe(2000);
        expect(cs.height).toBe(1200);
        expect(cs.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
    });

    test('.modal is a fixed, size-constrained dialog', async () => {
        await pageHelper.elementIdIs('modal');
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.position).toBe('fixed');
        expect(cs.allStyles['max-width']).toBe('640px');
        expect(cs.allStyles.width).toBe('640px');
        expect(cs.allStyles['max-height']).toBe('960px');
        expect(cs.backgroundColor).toBe('rgb(255, 255, 255)');
        expect(cs.allStyles['border-top-left-radius']).toBe('6px');
    });
});

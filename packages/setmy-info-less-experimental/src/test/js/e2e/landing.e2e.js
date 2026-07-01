const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

// Composed landing page (header + hero + service grid + price list + CTA banner + footer), built by
// combining base + extended + fancy classes. Measured at the 2000x1200 viewport.
describe(pageName + ' fancy composition tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('landing.html');
    });

    test('.siteHeader spans the full width', async () => {
        await pageHelper.elementIdIs('siteHeader');
        expect(pageHelper.data.computedStyles.width).toBe(2000);
    });

    test('.hero is a full-width fixed-height banner', async () => {
        await pageHelper.elementIdIs('hero');
        expect(pageHelper.data.computedStyles.width).toBe(2000);
        expect(pageHelper.data.computedStyles.height).toBe(360);
    });

    test('.ctaButton is one default-height tall', async () => {
        await pageHelper.elementIdIs('ctaButton');
        expect(pageHelper.data.computedStyles.height).toBe(50);
    });

    test('.tileImage uses the section-picture height', async () => {
        await pageHelper.elementIdIs('tileImage');
        expect(pageHelper.data.computedStyles.height).toBe(200);
    });
});

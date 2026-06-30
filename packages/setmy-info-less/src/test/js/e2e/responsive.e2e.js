const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

// Responsive visibility utilities (devices/). The single boundary is 1024px:
//   .phone-hidden -> display:none below 1024px (watch <=639 + phone 640-1023)
//   .pc-hidden    -> display:none at 1024px and wider (pad)
// They are exact inverses and never overlap.
async function displayOf(elementId) {
    await pageHelper.elementIdIs(elementId);
    return pageHelper.data.computedStyles.allStyles.display;
}

describe(pageName + ' responsive visibility tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('responsive.html');
    });

    test('wide / desktop (>= 1024px): phone-hidden visible, pc-hidden hidden', async () => {
        await pageHelper.setViewport(1400, 900);
        expect(await displayOf('phoneHidden')).not.toBe('none');
        expect(await displayOf('pcHidden')).toBe('none');
        expect(await displayOf('always')).not.toBe('none');
    });

    test('phone (640-1023px): phone-hidden hidden, pc-hidden visible', async () => {
        await pageHelper.setViewport(800, 900);
        expect(await displayOf('phoneHidden')).toBe('none');
        expect(await displayOf('pcHidden')).not.toBe('none');
    });

    test('watch (<= 639px): phone-hidden hidden, pc-hidden visible', async () => {
        await pageHelper.setViewport(500, 900);
        expect(await displayOf('phoneHidden')).toBe('none');
        expect(await displayOf('pcHidden')).not.toBe('none');
    });
});

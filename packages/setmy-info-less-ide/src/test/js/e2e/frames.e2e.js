const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

// NetBeans-style IDE frame layout (frames/index.less). Viewport is 2000x1200.
// Expected geometry (see frames/index.less):
//   frameHeaderHeight = 2 * halfDefaultHeight = 50px
//   frameFooterHeight = halfDefaultHeight     = 25px
//   content height     = 1200 - (50 + 25)     = 1125px
//   sectionLeft width  = 30% * 2000 - 8 - 4   = 588px
//   verticalSeparator  = 8px
//   sectionRight width = 70% * 2000           = 1400px
describe(pageName + ' frame layout tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('frames.html');
    });

    test('contentHeader fills width and is one header tall', async () => {
        await pageHelper.elementIdIs('contentHeader');
        expect(pageHelper.data.computedStyles.height).toBe(50);
        expect(pageHelper.data.computedStyles.width).toBe(2000);
    });

    test('content takes the remaining height', async () => {
        await pageHelper.elementIdIs('content');
        expect(pageHelper.data.computedStyles.height).toBe(1125);
        expect(pageHelper.data.computedStyles.width).toBe(2000);
    });

    test('contentFooter is half a default height tall', async () => {
        await pageHelper.elementIdIs('contentFooter');
        expect(pageHelper.data.computedStyles.height).toBe(25);
    });

    test('sectionLeft is the left 30% pane minus separator and borders', async () => {
        await pageHelper.elementIdIs('sectionLeft');
        expect(pageHelper.data.computedStyles.width).toBe(588);
    });

    test('verticalSeparator is 8px wide', async () => {
        await pageHelper.elementIdIs('verticalSeparator');
        expect(pageHelper.data.computedStyles.width).toBe(8);
    });

    test('sectionRight is the right 70% pane', async () => {
        await pageHelper.elementIdIs('sectionRight');
        expect(pageHelper.data.computedStyles.width).toBe(1400);
    });
});

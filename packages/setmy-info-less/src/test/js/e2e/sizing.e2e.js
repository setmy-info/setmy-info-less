const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

// sizing.less width/height utilities, measured at a 2000px-wide viewport.
//   .maxWidth            -> 100% -> 2000px
//   .halfWidth           ->  50% -> 1000px
//   .quarterWidth        ->  25% ->  500px
//   .threeQuartersWidth  ->  75% -> 1500px
//   .elementHeight       -> 50px
describe(pageName + ' sizing utility tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('sizing.html');
    });

    test('.maxWidth is full container width', async () => {
        await pageHelper.elementIdIs('maxWidth');
        expect(pageHelper.data.computedStyles.width).toBe(2000);
    });

    test('.halfWidth is 50%', async () => {
        await pageHelper.elementIdIs('halfWidth');
        expect(pageHelper.data.computedStyles.width).toBe(1000);
    });

    test('.quarterWidth is 25%', async () => {
        await pageHelper.elementIdIs('quarterWidth');
        expect(pageHelper.data.computedStyles.width).toBe(500);
    });

    test('.threeQuartersWidth is 75%', async () => {
        await pageHelper.elementIdIs('threeQuartersWidth');
        expect(pageHelper.data.computedStyles.width).toBe(1500);
    });

    test('.elementHeight is 50px', async () => {
        await pageHelper.elementIdIs('elementHeight');
        expect(pageHelper.data.computedStyles.height).toBe(50);
    });
});

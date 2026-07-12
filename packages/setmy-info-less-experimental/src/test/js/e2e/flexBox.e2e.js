const pageHelper = require('../../../../../common/test/js/pageHelper');
const getTestPageName = require('../../../../../common/test/js/testPageName');

const pageName = getTestPageName();

describe(pageName + ' flex panel tests', () => {

    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test('should load the page and check title', async () => {
        expect(await pageHelper.getTitle()).toBe('flexBox.html');
    });

    test('.smi-flex-panel.smi-flex-panel-right lays out children in a wrapped flex row, right-aligned', async () => {
        await pageHelper.elementIdIs('innerBox');
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.display).toBe('flex');
        expect(cs.allStyles['flex-wrap']).toBe('wrap');
        expect(cs.allStyles['align-content']).toBe('flex-start');
        expect(cs.allStyles['justify-content']).toBe('flex-end');
    });
});

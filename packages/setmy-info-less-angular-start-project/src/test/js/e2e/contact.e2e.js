const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/views/shared/detail-rows.less through the contact view that imports it.
describe(pageName + " contact view tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("contact.html");
    });

    test("a detail row is one full width 40px line", async () => {
        await pageHelper.elementIdIs("contactLinkRow");
        const cs = pageHelper.data.computedStyles;
        expect(cs.height).toBe(40);
        expect(cs.allStyles.display).toBe("table");
    });
});

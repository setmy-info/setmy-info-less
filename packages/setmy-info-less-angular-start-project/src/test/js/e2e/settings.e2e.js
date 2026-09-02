const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/views/settings/settings.component.less: the control row is the one detail
// row that carries controls, so it opts out of the fixed 40px line.
describe(pageName + " settings view tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("settings.html");
    });

    test("the control row is allowed to grow past the 40px line", async () => {
        await pageHelper.elementIdIs("tenantControlRow");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["min-height"]).toBe("40px");
        expect(cs.allStyles.display).toBe("table");
    });
});

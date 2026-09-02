const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/layout/footer-panel/footer-panel.component.less.
describe(pageName + " footer panel tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("footer-panel.html");
    });

    test("the footer is a centred 1024px, 50px high bar", async () => {
        await pageHelper.elementIdIs("footer");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["max-width"]).toBe("1024px");
        expect(cs.width).toBe(1024);
        expect(cs.height).toBe(50);
        expect(cs.backgroundColor).toBe("rgb(255, 255, 255)");
        expect(cs.fontSize).toBe("14px");
        expect(cs.allStyles["font-weight"]).toBe("800");
    });
});

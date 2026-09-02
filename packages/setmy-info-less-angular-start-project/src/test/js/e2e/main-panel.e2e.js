const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/layout/main-panel/main-panel.component.less: main leaves room for the
// header panel above it, and carries the footer strip at its own bottom.
describe(pageName + " main panel tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("main-panel.html");
    });

    test("main leaves 100px for the header panel", async () => {
        await pageHelper.elementIdIs("main");
        const cs = pageHelper.data.computedStyles;
        expect(cs.height).toBe(1100);
        expect(cs.allStyles["overflow-x"]).toBe("hidden");
    });

    test("#footerPanel is a full width 50px strip", async () => {
        await pageHelper.elementIdIs("footerPanel");
        const cs = pageHelper.data.computedStyles;
        expect(cs.width).toBe(2000);
        expect(cs.height).toBe(50);
        expect(cs.backgroundColor).toBe("rgb(255, 255, 255)");
    });
});

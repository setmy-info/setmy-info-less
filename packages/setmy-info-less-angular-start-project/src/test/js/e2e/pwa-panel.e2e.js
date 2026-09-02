const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/layout/pwa-panel/pwa-panel.component.less. The update banner shares the
// consent strip's visual language; the alert variant only changes the background.
describe(pageName + " pwa panel tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("pwa-panel.html");
    });

    test("the update banner matches the consent strip", async () => {
        await pageHelper.elementIdIs("pwaUpdateBanner");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["max-width"]).toBe("1024px");
        expect(cs.padding).toBe("10px 10px 10px 10px");
        expect(cs.backgroundColor).toBe("rgb(255, 255, 224)");
        expect(cs.allStyles["font-weight"]).toBe("900");
    });

    test("the alert variant only changes the background", async () => {
        await pageHelper.elementIdIs("pwaAlertBanner");
        const cs = pageHelper.data.computedStyles;
        expect(cs.backgroundColor).toBe("rgb(255, 224, 224)");
        expect(cs.padding).toBe("10px 10px 10px 10px");
    });
});

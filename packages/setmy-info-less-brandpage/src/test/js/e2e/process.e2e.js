const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// process.html — one panel: title band over zigzag rows, no dot rail. It takes the shared
// values, so the spacings the about page overrides must be the main page's here.
describe(pageName + " brand process page tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("process.html");
    });

    test("the title band is centred with a hairline under it", async () => {
        await pageHelper.elementIdIs("btop");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["text-align"]).toBe("center");
        expect(cs.allStyles["border-bottom-width"]).toBe("1px");
    });

    test("the band heading carries the brand blue", async () => {
        await pageHelper.elementIdIs("bt");
        const cs = pageHelper.data.computedStyles;
        expect(cs.color).toBe("rgb(25, 25, 112)");
        expect(cs.allStyles["font-weight"]).toBe("300");
    });

    test("the reversed row mirrors itself with direction", async () => {
        await pageHelper.elementIdIs("srow2");
        expect(pageHelper.data.computedStyles.allStyles.direction).toBe("rtl");
    });

    test("the footnote keeps the shared spacing", async () => {
        await pageHelper.elementIdIs("cf");
        expect(pageHelper.data.computedStyles.allStyles["margin-top"]).toBe(
            "28px",
        );
    });
});

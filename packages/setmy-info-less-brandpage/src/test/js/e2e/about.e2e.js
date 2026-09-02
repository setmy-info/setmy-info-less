const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// about.html — prose panel plus the shared chrome. The point of this suite is the page-scoped
// part: .brandAboutPage on <body> is what makes pages/about.less's three overrides apply, and
// they must not leak onto the other pages (see index.e2e.js for the unscoped values).
describe(pageName + " brand about page tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("about.html");
    });

    test("the prose column is narrower than the content column", async () => {
        await pageHelper.elementIdIs("ptext");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["max-width"]).toBe("720px");
        expect(cs.width).toBe(720);
    });

    test("the page overrides the scroll nudge spacing", async () => {
        await pageHelper.elementIdIs("hint");
        expect(pageHelper.data.computedStyles.padding).toBe("20px 0px 0px 0px");
    });

    test("the page overrides the footnote spacing", async () => {
        await pageHelper.elementIdIs("cf");
        expect(pageHelper.data.computedStyles.allStyles["margin-top"]).toBe(
            "36px",
        );
    });

    test("the shared chrome is unchanged", async () => {
        await pageHelper.elementIdIs("hdr");
        const cs = pageHelper.data.computedStyles;
        expect(cs.height).toBe(50);
        expect(cs.allStyles["z-index"]).toBe("200");
    });
});

const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/layout/header-panel/ — the component file plus its header/ and
// navigation/ partials, on the page mirroring header-panel.component.html.
describe(pageName + " header panel tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("header-panel.html");
    });

    test("#headerPanel grows to hold the header and the navigation row", async () => {
        await pageHelper.elementIdIs("headerPanel");
        expect(pageHelper.data.computedStyles.height).toBe(100);
    });

    test("the header row is centred, 1024px wide and 50px high", async () => {
        await pageHelper.elementIdIs("header");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["max-width"]).toBe("1024px");
        expect(cs.width).toBe(1024);
        expect(cs.height).toBe(50);
        expect(cs.backgroundColor).toBe("rgb(255, 255, 255)");
        expect(cs.fontSize).toBe("14px");
        expect(cs.allStyles["font-weight"]).toBe("800");
    });

    test("the navigation row matches the header row", async () => {
        await pageHelper.elementIdIs("navigation");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["max-width"]).toBe("1024px");
        expect(cs.width).toBe(1024);
        expect(cs.height).toBe(50);
        expect(cs.backgroundColor).toBe("rgb(255, 255, 255)");
        expect(cs.allStyles["font-weight"]).toBe("900");
    });

    test("the hamburger is a borderless 50px icon button", async () => {
        await pageHelper.elementIdIs("menuButton");
        const cs = pageHelper.data.computedStyles;
        expect(cs.width).toBe(50);
        expect(cs.allStyles.cursor).toBe("pointer");
        expect(cs.allStyles["border-top-style"]).toBe("none");
        expect(cs.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    });
});

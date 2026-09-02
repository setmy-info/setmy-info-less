const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/layout/side-navigation-panel/. The page carries the plain-JS helper
// (src/test/pug/include/js/side-navigation-panel.js) that stands in for Angular's
// ModalService, so the open state can be measured as well as the closed one.
describe(pageName + " side navigation panel tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("side-navigation-panel.html");
    });

    test("the panel starts closed", async () => {
        await pageHelper.elementIdIs("sidenav");
        expect(pageHelper.data.computedStyles.allStyles.display).toBe("none");
    });

    test("the hamburger button opens the panel", async () => {
        await pageHelper.clickElementId("menuButton");
        await pageHelper.elementIdIs("sidenav");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.display).toBe("block");
        expect(cs.allStyles.position).toBe("absolute");
        expect(cs.allStyles.width).toBe("290px");
        expect(cs.top).toBe(0);
        expect(cs.left).toBe(0);
        expect(cs.backgroundColor).toBe("rgb(255, 255, 255)");
    });

    test("the panel header is a gray 50px bar", async () => {
        await pageHelper.elementIdIs("sideNavigationHeaderPanel");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.height).toBe("50px");
        expect(cs.backgroundColor).toBe("rgb(128, 128, 128)");
    });

    test("the content panel scrolls below the header", async () => {
        await pageHelper.elementIdIs("sideNavigationContentPanel");
        expect(pageHelper.data.computedStyles.allStyles["overflow-y"]).toBe(
            "auto",
        );
    });

    test("the close button closes the panel again", async () => {
        await pageHelper.clickElementId("sideNavigationCloseButton");
        await pageHelper.elementIdIs("sidenav");
        expect(pageHelper.data.computedStyles.allStyles.display).toBe("none");
    });
});

const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/layout/consent-panel/consent-body-panel.component.less.
describe(pageName + " consent body panel tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("consent-body-panel.html");
    });

    test("the consent strip is a centred, padded light yellow band", async () => {
        await pageHelper.elementIdIs("consentBody");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["max-width"]).toBe("1024px");
        expect(cs.padding).toBe("10px 10px 10px 10px");
        expect(cs.backgroundColor).toBe("rgb(255, 255, 224)");
        expect(cs.allStyles["font-weight"]).toBe("900");
    });

    test("its accept button is a rounded, clickable control", async () => {
        await pageHelper.elementIdIs("consentAcceptButton");
        const cs = pageHelper.data.computedStyles;
        expect(cs.height).toBe(28);
        expect(cs.allStyles["border-top-left-radius"]).toBe("5px");
        expect(cs.allStyles.cursor).toBe("pointer");
        expect(cs.backgroundColor).toBe("rgb(211, 211, 211)");
    });
});

const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// Covers components/detail-level-panel/detail-level-panel.component.less: a floated inline-block
// list, no flex, with room reserved for the longest level name so the row does not shift.
describe(pageName + " detail level panel tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("detail-level-panel.html");
    });

    test("the custom element host is a block", async () => {
        await pageHelper.elementIdIs("detailLevelPanel");
        expect(pageHelper.data.computedStyles.allStyles.display).toBe("block");
    });

    test("the list is one 50px row without markers", async () => {
        await pageHelper.elementIdIs("detailsLevelList");
        const cs = pageHelper.data.computedStyles;
        expect(cs.height).toBe(50);
        expect(cs.allStyles["list-style-type"]).toBe("none");
        expect(cs.allStyles["margin-left"]).toBe("0px");
    });

    test("the items sit inline on that row, not in a flex box", async () => {
        await pageHelper.elementIdIs("detailsLevelLabelItem");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.display).toBe("inline-block");
        expect(cs.allStyles["vertical-align"]).toBe("middle");
        expect(cs.allStyles["line-height"]).toBe("50px");
        expect(cs.height).toBe(50);
    });

    test("the value item reserves room for the longest level name", async () => {
        await pageHelper.elementIdIs("detailsLevelValueItem");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["min-width"]).toBe("90px");
        expect(cs.allStyles["margin-left"]).toBe("10px");
    });

    test("the slider is a fixed width control tinted with the detail green", async () => {
        await pageHelper.elementIdIs("detailsLevelSlider");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.width).toBe("120px");
        expect(cs.allStyles.cursor).toBe("pointer");
        expect(cs.allStyles["accent-color"]).toBe("rgb(115, 208, 115)");
    });

    test("the value reads bold next to the plain label", async () => {
        await pageHelper.elementIdIs("detailsLevelValue");
        expect(pageHelper.data.computedStyles.allStyles["font-weight"]).toBe(
            "700",
        );
        expect(pageHelper.data.computedStyles.fontSize).toBe("14px");
    });
});

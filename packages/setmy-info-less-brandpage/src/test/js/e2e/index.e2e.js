const pageHelper = require("../../../../../../scripts/pageHelper.cjs");
const getTestPageName = require("../../../../../../scripts/testPageName.cjs");

const pageName = getTestPageName();

// index.html — the main brand page. Covers the parts pages/index.less loads: header, dots,
// stage, panel, band, slogan, hint, heading, contact, note, page-link, preview, consent.
describe(pageName + " brand page tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        expect(await pageHelper.getTitle()).toBe("index.html");
    });

    test("the brand bar is fixed across the top", async () => {
        await pageHelper.elementIdIs("hdr");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.position).toBe("fixed");
        expect(cs.top).toBe(0);
        expect(cs.left).toBe(0);
        expect(cs.width).toBe(2000);
        expect(cs.height).toBe(50);
        expect(cs.allStyles["z-index"]).toBe("200");
        expect(cs.allStyles["box-sizing"]).toBe("border-box");
    });

    test("the brand mark fills the bar height", async () => {
        await pageHelper.elementIdIs("bm");
        expect(pageHelper.data.computedStyles.allStyles["line-height"]).toBe(
            "50px",
        );
    });

    test("the stage covers the viewport under the bar", async () => {
        await pageHelper.elementIdIs("stage");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.position).toBe("fixed");
        expect(cs.width).toBe(2000);
        expect(cs.height).toBe(1200);
        expect(cs.allStyles["z-index"]).toBe("10");
    });

    test("the panels stack in z order with their own backgrounds", async () => {
        await pageHelper.elementIdIs("p1");
        expect(pageHelper.data.computedStyles.backgroundColor).toBe(
            "rgb(255, 255, 255)",
        );
        expect(pageHelper.data.computedStyles.allStyles["z-index"]).toBe("1");

        await pageHelper.elementIdIs("p2");
        expect(pageHelper.data.computedStyles.backgroundColor).toBe(
            "rgb(246, 248, 250)",
        );
        expect(pageHelper.data.computedStyles.allStyles["z-index"]).toBe("2");
    });

    test("the panel body scrolls and the content column is centred", async () => {
        await pageHelper.elementIdIs("p1Body");
        expect(pageHelper.data.computedStyles.allStyles["overflow-y"]).toBe(
            "auto",
        );

        await pageHelper.elementIdIs("p1Content");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles["max-width"]).toBe("1040px");
        // The content column clears the fixed 50px bar: 50px + 26px.
        expect(cs.padding).toBe("76px 28px 50px 28px");
    });

    test("a zigzag row is a table with the picture cell at 44%", async () => {
        await pageHelper.elementIdIs("srow1");
        expect(pageHelper.data.computedStyles.allStyles.display).toBe("table");

        await pageHelper.elementIdIs("srow1Img");
        expect(pageHelper.data.computedStyles.allStyles.display).toBe(
            "table-cell",
        );

        await pageHelper.elementIdIs("srow2");
        expect(pageHelper.data.computedStyles.allStyles.direction).toBe("rtl");

        await pageHelper.elementIdIs("srow2Text");
        expect(pageHelper.data.computedStyles.allStyles.direction).toBe("ltr");
    });

    test("the scroll nudge uses the main page spacing", async () => {
        await pageHelper.elementIdIs("hint");
        const cs = pageHelper.data.computedStyles;
        // opacity is not asserted: the nudge animates it, so it is never at rest.
        expect(cs.allStyles["animation-name"]).toBe("nb");
        expect(cs.padding).toBe("12px 0px 0px 0px");
    });

    test("the footnote uses the main page spacing", async () => {
        await pageHelper.elementIdIs("cf");
        expect(pageHelper.data.computedStyles.allStyles["margin-top"]).toBe(
            "28px",
        );
    });

    test("a social chip is a rounded tinted pill", async () => {
        await pageHelper.elementIdIs("socialChip");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.display).toBe("inline-block");
        expect(cs.backgroundColor).toBe("rgb(223, 231, 242)");
        expect(cs.allStyles["border-top-left-radius"]).toBe("6px");
    });

    test("the privacy overlay opens from the footnote link and closes again", async () => {
        await pageHelper.elementIdIs("prv");
        expect(pageHelper.data.computedStyles.allStyles.display).toBe("none");

        await pageHelper.clickElementId("privacyLink");
        await pageHelper.elementIdIs("prv");
        const open = pageHelper.data.computedStyles;
        expect(open.allStyles.display).toBe("block");
        expect(open.allStyles.position).toBe("fixed");
        expect(open.allStyles["z-index"]).toBe("800");
        expect(open.width).toBe(2000);

        await pageHelper.clickElementId("previewClose");
        await pageHelper.elementIdIs("prv");
        expect(pageHelper.data.computedStyles.allStyles.display).toBe("none");
    });

    test("the consent bar sits at the bottom until it is accepted", async () => {
        await pageHelper.elementIdIs("gb");
        const cs = pageHelper.data.computedStyles;
        expect(cs.allStyles.position).toBe("fixed");
        expect(cs.allStyles["z-index"]).toBe("600");
        expect(cs.allStyles["border-top-width"]).toBe("2px");
        expect(cs.width).toBe(2000);

        await pageHelper.clickElementId("consentAccept");
        await pageHelper.elementIdIs("gb");
        expect(pageHelper.data.computedStyles.allStyles.display).toBe("none");
    });
});

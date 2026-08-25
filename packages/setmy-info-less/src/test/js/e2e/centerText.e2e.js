const pageHelper = require("../../../../../../tools/pageHelper.cjs");
const getTestPageName = require("../../../../../../tools/testPageName.cjs");

const pageName = getTestPageName();

describe(pageName + " page layout tests", () => {
    beforeAll(async () => {
        pageHelper.pageName(pageName);
        await pageHelper.pageIsRendered();
    });

    afterAll(async () => {
        await pageHelper.pageClose();
    });

    test("should load the page and check title", async () => {
        const title = await pageHelper.getTitle();
        expect(title).toBe("centerText.html");

        await pageHelper.elementExpectations("centerText", {
            margin: "0px 0px 0px 0px",
            padding: "0px 0px 0px 0px",
            fontFamily:
                "DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif",
            fontSize: "16px",
            x: 0,
            y: 0,
            width: 2000,
            height: 19,
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "rgb(0, 0, 0)",
        });

        // The span shrink-wraps its text, so its width is decided by the
        // FIRST font in the stack that the browser actually has installed -
        // 77px with DejaVu Serif, 68px where the stack falls through to
        // Arial. Asserting either number pins the suite to one machine's
        // font set. What .centerText is responsible for is the centring, so
        // that is what is asserted: whatever the text measures, it sits in
        // the middle of the 2000px container. Every other assertion here is
        // block geometry and stays exact.
        await pageHelper.elementIdIs("spanCenterText");

        const span = pageHelper.data.computedStyles;

        expect(span.margin).toBe("0px 0px 0px 0px");
        expect(span.padding).toBe("0px 0px 0px 0px");
        expect(span.fontFamily).toContain(
            "DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif",
        );
        expect(span.fontSize).toBe("16px");
        expect(span.y).toBe(0);
        expect(span.top).toBe(0);
        expect(span.height).toBe(19);
        expect(span.backgroundColor).toBe("rgba(0, 0, 0, 0)");
        expect(span.color).toBe("rgb(0, 0, 0)");
        expect(span.width).toBeGreaterThan(0);
        expect(span.width).toBeLessThan(2000);
        expect(span.x).toBeCloseTo((2000 - span.width) / 2, 0);
        expect(span.left).toBe(Math.round(span.x));
    });
});

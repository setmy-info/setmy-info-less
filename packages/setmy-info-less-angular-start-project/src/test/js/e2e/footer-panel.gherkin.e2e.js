const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const footerPanelFeature = feature(
    "footer panel page",
    scenario(
        "footer rendering with specific properties",
        given.pageNameIs("footer-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("footer"),
        then.pageShouldHaveTitle("footer-panel.html"),
        then.pageElementStyleShouldBe("max-width", "1024px"),
        then.pageElementWidthShouldBe(1024),
        then.pageElementHeightShouldBe(50),
        then.pageElementBackgroundColorShouldBe("rgb(255, 255, 255)"),
        then.pageElementFontSizeShouldBe("14px"),
        then.pageElementStyleShouldBe("font-weight", "800"),
        then.pageIsClosed(),
    ),
);

runFeature(footerPanelFeature);

module.exports = footerPanelFeature;

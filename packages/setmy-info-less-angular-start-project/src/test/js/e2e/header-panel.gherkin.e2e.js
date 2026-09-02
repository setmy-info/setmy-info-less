const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const headerPanelFeature = feature(
    "header panel page",
    scenario(
        "header row rendering with specific properties",
        given.pageNameIs("header-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("header"),
        then.pageShouldHaveTitle("header-panel.html"),
        then.pageElementStyleShouldBe("max-width", "1024px"),
        then.pageElementWidthShouldBe(1024),
        then.pageElementHeightShouldBe(50),
        then.pageElementBackgroundColorShouldBe("rgb(255, 255, 255)"),
        then.pageElementFontSizeShouldBe("14px"),
        then.pageElementStyleShouldBe("font-weight", "800"),
        then.pageIsClosed(),
    ),
    scenario(
        "navigation row rendering with specific properties",
        given.pageNameIs("header-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("navigation"),
        then.pageElementStyleShouldBe("max-width", "1024px"),
        then.pageElementWidthShouldBe(1024),
        then.pageElementHeightShouldBe(50),
        then.pageElementBackgroundColorShouldBe("rgb(255, 255, 255)"),
        then.pageElementStyleShouldBe("font-weight", "900"),
        then.pageIsClosed(),
    ),
);

runFeature(headerPanelFeature);

module.exports = headerPanelFeature;

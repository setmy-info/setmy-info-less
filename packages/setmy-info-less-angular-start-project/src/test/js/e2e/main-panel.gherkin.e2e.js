const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const mainPanelFeature = feature(
    "main panel page",
    scenario(
        "main leaves room for the header panel",
        given.pageNameIs("main-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("main"),
        then.pageShouldHaveTitle("main-panel.html"),
        then.pageElementHeightShouldBe(1100),
        then.pageElementStyleShouldBe("overflow-x", "hidden"),
        then.pageIsClosed(),
    ),
    scenario(
        "footer strip rendering with specific properties",
        given.pageNameIs("main-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("footerPanel"),
        then.pageElementWidthShouldBe(2000),
        then.pageElementHeightShouldBe(50),
        then.pageElementBackgroundColorShouldBe("rgb(255, 255, 255)"),
        then.pageIsClosed(),
    ),
);

runFeature(mainPanelFeature);

module.exports = mainPanelFeature;

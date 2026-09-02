const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const detailLevelPanelFeature = feature(
    "detail level panel page",
    scenario(
        "list row rendering with specific properties",
        given.pageNameIs("detail-level-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("detailsLevelList"),
        then.pageShouldHaveTitle("detail-level-panel.html"),
        then.pageElementHeightShouldBe(50),
        then.pageElementStyleShouldBe("list-style-type", "none"),
        then.pageElementStyleShouldBe("margin-left", "0px"),
        then.pageIsClosed(),
    ),
    scenario(
        "items sit inline, not in a flex box",
        given.pageNameIs("detail-level-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("detailsLevelLabelItem"),
        then.pageElementStyleShouldBe("display", "inline-block"),
        then.pageElementStyleShouldBe("vertical-align", "middle"),
        then.pageElementStyleShouldBe("line-height", "50px"),
        then.pageElementHeightShouldBe(50),
        then.pageIsClosed(),
    ),
    scenario(
        "slider rendering with specific properties",
        given.pageNameIs("detail-level-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("detailsLevelSlider"),
        then.pageElementStyleShouldBe("width", "120px"),
        then.pageElementStyleShouldBe("cursor", "pointer"),
        then.pageElementStyleShouldBe("accent-color", "rgb(115, 208, 115)"),
        then.pageIsClosed(),
    ),
);

runFeature(detailLevelPanelFeature);

module.exports = detailLevelPanelFeature;

const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const brandIndexFeature = feature(
    "brand index page",
    scenario(
        "brand bar rendering with specific properties",
        given.pageNameIs("index"),
        when.pageIsRendered(),
        when.pageElementIdIs("hdr"),
        then.pageShouldHaveTitle("index.html"),
        then.pageElementStyleShouldBe("position", "fixed"),
        then.pageElementTopShouldBe(0),
        then.pageElementLeftShouldBe(0),
        then.pageElementWidthShouldBe(2000),
        then.pageElementHeightShouldBe(50),
        then.pageElementStyleShouldBe("z-index", "200"),
        then.pageIsClosed(),
    ),
    scenario(
        "content column clears the fixed bar",
        given.pageNameIs("index"),
        when.pageIsRendered(),
        when.pageElementIdIs("p1Content"),
        then.pageElementStyleShouldBe("max-width", "1040px"),
        then.pageElementPaddingShouldBe("76px 28px 50px 28px"),
        then.pageIsClosed(),
    ),
    scenario(
        "privacy overlay opens from the footnote link",
        given.pageNameIs("index"),
        when.pageIsRendered(),
        when.pageElementIdIs("prv"),
        then.pageElementStyleShouldBe("display", "none"),
        when.pageElementIdIsClicked("privacyLink"),
        when.pageElementIdIs("prv"),
        then.pageElementStyleShouldBe("display", "block"),
        then.pageElementStyleShouldBe("z-index", "800"),
        then.pageIsClosed(),
    ),
    scenario(
        "consent bar is dismissed when it is accepted",
        given.pageNameIs("index"),
        when.pageIsRendered(),
        when.pageElementIdIs("gb"),
        then.pageElementStyleShouldBe("position", "fixed"),
        then.pageElementStyleShouldBe("z-index", "600"),
        when.pageElementIdIsClicked("consentAccept"),
        when.pageElementIdIs("gb"),
        then.pageElementStyleShouldBe("display", "none"),
        then.pageIsClosed(),
    ),
);

runFeature(brandIndexFeature);

module.exports = brandIndexFeature;

const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const brandAboutFeature = feature(
    "brand about page",
    scenario(
        "prose column rendering with specific properties",
        given.pageNameIs("about"),
        when.pageIsRendered(),
        when.pageElementIdIs("ptext"),
        then.pageShouldHaveTitle("about.html"),
        then.pageElementStyleShouldBe("max-width", "720px"),
        then.pageElementWidthShouldBe(720),
        then.pageIsClosed(),
    ),
    scenario(
        "page scoped overrides apply on this page",
        given.pageNameIs("about"),
        when.pageIsRendered(),
        when.pageElementIdIs("hint"),
        then.pageElementPaddingShouldBe("20px 0px 0px 0px"),
        when.pageElementIdIs("cf"),
        then.pageElementStyleShouldBe("margin-top", "36px"),
        then.pageIsClosed(),
    ),
);

runFeature(brandAboutFeature);

module.exports = brandAboutFeature;

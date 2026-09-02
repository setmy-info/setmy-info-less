const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const brandProcessFeature = feature(
    "brand process page",
    scenario(
        "title band rendering with specific properties",
        given.pageNameIs("process"),
        when.pageIsRendered(),
        when.pageElementIdIs("btop"),
        then.pageShouldHaveTitle("process.html"),
        then.pageElementStyleShouldBe("text-align", "center"),
        then.pageElementStyleShouldBe("border-bottom-width", "1px"),
        then.pageIsClosed(),
    ),
    scenario(
        "shared spacing is not affected by the about page overrides",
        given.pageNameIs("process"),
        when.pageIsRendered(),
        when.pageElementIdIs("cf"),
        then.pageElementStyleShouldBe("margin-top", "28px"),
        then.pageIsClosed(),
    ),
);

runFeature(brandProcessFeature);

module.exports = brandProcessFeature;

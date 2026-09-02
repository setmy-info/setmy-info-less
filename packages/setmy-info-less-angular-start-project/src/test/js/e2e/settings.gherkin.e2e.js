const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const settingsFeature = feature(
    "settings view page",
    scenario(
        "control row is allowed to grow past the 40px line",
        given.pageNameIs("settings"),
        when.pageIsRendered(),
        when.pageElementIdIs("tenantControlRow"),
        then.pageShouldHaveTitle("settings.html"),
        then.pageElementStyleShouldBe("min-height", "40px"),
        then.pageElementStyleShouldBe("display", "table"),
        then.pageIsClosed(),
    ),
);

runFeature(settingsFeature);

module.exports = settingsFeature;

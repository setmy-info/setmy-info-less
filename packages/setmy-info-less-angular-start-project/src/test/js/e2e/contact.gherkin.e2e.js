const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const contactFeature = feature(
    "contact view page",
    scenario(
        "detail row rendering with specific properties",
        given.pageNameIs("contact"),
        when.pageIsRendered(),
        when.pageElementIdIs("contactLinkRow"),
        then.pageShouldHaveTitle("contact.html"),
        then.pageElementHeightShouldBe(40),
        then.pageElementStyleShouldBe("display", "table"),
        then.pageIsClosed(),
    ),
);

runFeature(contactFeature);

module.exports = contactFeature;

const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const consentBodyPanelFeature = feature(
    "consent body panel page",
    scenario(
        "consent strip rendering with specific properties",
        given.pageNameIs("consent-body-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("consentBody"),
        then.pageShouldHaveTitle("consent-body-panel.html"),
        then.pageElementStyleShouldBe("max-width", "1024px"),
        then.pageElementPaddingShouldBe("10px 10px 10px 10px"),
        then.pageElementBackgroundColorShouldBe("rgb(255, 255, 224)"),
        then.pageElementStyleShouldBe("font-weight", "900"),
        then.pageIsClosed(),
    ),
    scenario(
        "accept button rendering with specific properties",
        given.pageNameIs("consent-body-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("consentAcceptButton"),
        then.pageElementHeightShouldBe(28),
        then.pageElementStyleShouldBe("border-top-left-radius", "5px"),
        then.pageElementStyleShouldBe("cursor", "pointer"),
        then.pageElementBackgroundColorShouldBe("rgb(211, 211, 211)"),
        then.pageIsClosed(),
    ),
);

runFeature(consentBodyPanelFeature);

module.exports = consentBodyPanelFeature;

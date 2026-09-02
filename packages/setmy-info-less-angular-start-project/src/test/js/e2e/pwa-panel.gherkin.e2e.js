const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const pwaPanelFeature = feature(
    "pwa panel page",
    scenario(
        "update banner rendering with specific properties",
        given.pageNameIs("pwa-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("pwaUpdateBanner"),
        then.pageShouldHaveTitle("pwa-panel.html"),
        then.pageElementStyleShouldBe("max-width", "1024px"),
        then.pageElementPaddingShouldBe("10px 10px 10px 10px"),
        then.pageElementBackgroundColorShouldBe("rgb(255, 255, 224)"),
        then.pageElementStyleShouldBe("font-weight", "900"),
        then.pageIsClosed(),
    ),
    scenario(
        "alert banner only changes the background",
        given.pageNameIs("pwa-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("pwaAlertBanner"),
        then.pageElementBackgroundColorShouldBe("rgb(255, 224, 224)"),
        then.pageElementPaddingShouldBe("10px 10px 10px 10px"),
        then.pageIsClosed(),
    ),
);

runFeature(pwaPanelFeature);

module.exports = pwaPanelFeature;

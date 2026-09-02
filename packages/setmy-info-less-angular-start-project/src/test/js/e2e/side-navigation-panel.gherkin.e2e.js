const {
    feature,
    scenario,
    given,
    when,
    then,
    runFeature,
} = require("../../../../../../scripts/gherkin/index.cjs");

const sideNavigationPanelFeature = feature(
    "side navigation panel page",
    scenario(
        "menu is closed until the hamburger is used",
        given.pageNameIs("side-navigation-panel"),
        when.pageIsRendered(),
        when.pageElementIdIs("sidenav"),
        then.pageShouldHaveTitle("side-navigation-panel.html"),
        then.pageElementStyleShouldBe("display", "none"),
        then.pageIsClosed(),
    ),
    scenario(
        "hamburger opens the menu",
        given.pageNameIs("side-navigation-panel"),
        when.pageIsRendered(),
        when.pageElementIdIsClicked("menuButton"),
        when.pageElementIdIs("sidenav"),
        then.pageElementStyleShouldBe("display", "block"),
        then.pageElementStyleShouldBe("position", "absolute"),
        then.pageElementStyleShouldBe("width", "290px"),
        then.pageElementTopShouldBe(0),
        then.pageElementLeftShouldBe(0),
        then.pageElementBackgroundColorShouldBe("rgb(255, 255, 255)"),
        then.pageIsClosed(),
    ),
    scenario(
        "close button closes the menu again",
        given.pageNameIs("side-navigation-panel"),
        when.pageIsRendered(),
        when.pageElementIdIsClicked("menuButton"),
        when.pageElementIdIsClicked("sideNavigationCloseButton"),
        when.pageElementIdIs("sidenav"),
        then.pageElementStyleShouldBe("display", "none"),
        then.pageIsClosed(),
    ),
);

runFeature(sideNavigationPanelFeature);

module.exports = sideNavigationPanelFeature;

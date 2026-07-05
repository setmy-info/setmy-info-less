const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const landingFeature = feature('landing composition page',
    scenario('a public landing page is composed from base + extended + fancy classes',
        given.pageNameIs('landing'),
        when.pageIsRendered(),
        when.pageElementIdIs('siteHeader'),
        then.pageShouldHaveTitle('landing.html'),
        then.pageElementWidthShouldBe(2000),
        when.pageElementIdIs('hero'),
        then.pageElementWidthShouldBe(2000),
        then.pageElementHeightShouldBe(360),
        when.pageElementIdIs('ctaButton'),
        then.pageElementHeightShouldBe(50),
        when.pageElementIdIs('tileImage'),
        then.pageElementHeightShouldBe(200),
        then.pageIsClosed()
    )
);

runFeature(landingFeature);

module.exports = landingFeature;

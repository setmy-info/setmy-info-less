const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const modalFeature = feature('modal page',
    scenario('overlay rendering with specific properties',
        given.pageNameIs('modal'),
        when.pageIsRendered(),
        when.pageElementIdIs('overlay'),
        then.pageShouldHaveTitle('modal.html'),
        then.pageElementStyleShouldBe('position', 'fixed'),
        then.pageElementTopShouldBe(0),
        then.pageElementLeftShouldBe(0),
        then.pageElementWidthShouldBe(2000),
        then.pageElementHeightShouldBe(1200),
        then.pageElementBackgroundColorShouldBe('rgba(0, 0, 0, 0.5)'),
        then.pageIsClosed()
    ),
    scenario('modal dialog rendering with specific properties',
        given.pageNameIs('modal'),
        when.pageIsRendered(),
        when.pageElementIdIs('modal'),
        then.pageShouldHaveTitle('modal.html'),
        then.pageElementStyleShouldBe('position', 'fixed'),
        then.pageElementStyleShouldBe('max-width', '640px'),
        then.pageElementStyleShouldBe('width', '640px'),
        then.pageElementStyleShouldBe('max-height', '960px'),
        then.pageElementBackgroundColorShouldBe('rgb(255, 255, 255)'),
        then.pageElementStyleShouldBe('border-top-left-radius', '6px'),
        then.pageIsClosed()
    )
);

runFeature(modalFeature);

module.exports = modalFeature;

const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const bodyFeature = feature('body page',
    scenario('body rendering with specific properties',
        given.pageNameIs('body'),
        when.pageIsRendered(),
        when.pageElementIdIs('body'),
        then.pageShouldHaveTitle('body.html'),
        then.pageElementMarginShouldBe('0px 0px 0px 0px'),
        then.pageElementPaddingShouldBe('0px 0px 0px 0px'),
        then.pageElementFontFamilyShouldBe('DejaVu Serif, Roboto, Arial, Noto Sans, Noto, sans-serif'),
        then.pageElementFontSizeShouldBe('16px'),
        then.pageElementXShouldBe(0),
        then.pageElementYShouldBe(0),
        then.pageElementWidthShouldBe(2000),
        then.pageElementHeightShouldBe(1200),
        then.pageElementTopShouldBe(0),
        then.pageElementLeftShouldBe(0),
        then.pageElementBackgroundColorShouldBe('rgba(0, 0, 0, 0)'),
        then.pageElementColorShouldBe('rgb(0, 0, 0)'),
        then.pageIsClosed()
    )
);

runFeature(bodyFeature);

module.exports = bodyFeature;

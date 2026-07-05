const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const articleFeature = feature('article page',
    scenario('article rendering with specific properties',
        given.pageNameIs('article'),
        when.pageIsRendered(),
        when.pageElementIdIs('article'),
        then.pageShouldHaveTitle('article.html'),
        then.pageElementStyleShouldBe('line-height', '27.2px'),
        then.pageElementFontSizeShouldBe('16px'),
        then.pageElementColorShouldBe('rgb(0, 0, 0)'),
        then.pageIsClosed()
    )
);

runFeature(articleFeature);

module.exports = articleFeature;

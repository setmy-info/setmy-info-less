const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const sectionFeature = feature('section page',
    scenario('section rendering with specific properties',
        given.pageNameIs('section'),
        when.pageIsRendered(),
        when.pageElementIdIs('section'),
        then.pageShouldHaveTitle('section.html'),
        then.pageElementStyleShouldBe('max-width', '1024px'),
        then.pageElementPaddingShouldBe('20px 10px 20px 10px'),
        then.pageElementStyleShouldBe('width', '1024px'),
        then.pageIsClosed()
    )
);

runFeature(sectionFeature);

module.exports = sectionFeature;

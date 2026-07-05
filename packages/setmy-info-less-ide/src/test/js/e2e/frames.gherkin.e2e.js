const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const framesFeature = feature('IDE frames page',
    scenario('NetBeans-style frame layout is provided by the IDE package',
        given.pageNameIs('frames'),
        when.pageIsRendered(),
        when.pageElementIdIs('body'),
        then.pageShouldHaveTitle('frames.html'),
        then.pageElementPaddingShouldBe('0px 0px 0px 0px'),
        when.pageElementIdIs('contentHeader'),
        then.pageElementHeightShouldBe(50),
        when.pageElementIdIs('content'),
        then.pageElementHeightShouldBe(1125),
        when.pageElementIdIs('sectionLeft'),
        then.pageElementWidthShouldBe(588),
        when.pageElementIdIs('verticalSeparator'),
        then.pageElementWidthShouldBe(8),
        when.pageElementIdIs('contentFooter'),
        then.pageElementHeightShouldBe(25),
        then.pageIsClosed()
    )
);

runFeature(framesFeature);

module.exports = framesFeature;

const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const experimentalFramesFeature = feature('IDE experimental frames page',
    scenario('experimental frames page is generated from the IDE workspace',
        given.pageNameIs('experimental-frames'),
        when.pageIsRendered(),
        when.pageElementIdIs('body'),
        then.pageShouldHaveTitle('experimental-frames.html'),
        then.pageElementPaddingShouldBe('0px 0px 0px 0px'),
        when.pageElementIdIs('verticalDivider'),
        then.pageElementWidthShouldBe(8),
        when.pageElementIdIs('horizontalLeftDivider'),
        then.pageElementHeightShouldBe(4),
        when.pageElementIdIs('horizontalRightDivider'),
        then.pageElementHeightShouldBe(4),
        when.pageElementIdIs('body'),
        then.pageElementStyleShouldBe('cursor', 'auto'),
        then.pageIsClosed()
    )
);

runFeature(experimentalFramesFeature);

module.exports = experimentalFramesFeature;

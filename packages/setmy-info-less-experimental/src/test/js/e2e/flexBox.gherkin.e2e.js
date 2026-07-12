const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const flexBoxFeature = feature('flexBox page',
    scenario('smi-flex-panel rendering with specific properties',
        given.pageNameIs('flexBox'),
        when.pageIsRendered(),
        when.pageElementIdIs('innerBox'),
        then.pageShouldHaveTitle('flexBox.html'),
        then.pageElementStyleShouldBe('display', 'flex'),
        then.pageElementStyleShouldBe('flex-wrap', 'wrap'),
        then.pageElementStyleShouldBe('align-content', 'flex-start'),
        then.pageElementStyleShouldBe('justify-content', 'flex-end'),
        then.pageIsClosed()
    )
);

runFeature(flexBoxFeature);

module.exports = flexBoxFeature;

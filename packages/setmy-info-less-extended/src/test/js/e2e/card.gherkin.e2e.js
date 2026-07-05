const {feature, scenario, given, when, then, runFeature} = require('../../../../../common/test/js/gherkin');

const cardFeature = feature('card page',
    scenario('card rendering with specific properties',
        given.pageNameIs('card'),
        when.pageIsRendered(),
        when.pageElementIdIs('card'),
        then.pageShouldHaveTitle('card.html'),
        then.pageElementPaddingShouldBe('20px 20px 20px 20px'),
        then.pageElementBackgroundColorShouldBe('rgb(255, 255, 255)'),
        then.pageElementStyleShouldBe('border-top-width', '2px'),
        then.pageElementStyleShouldBe('border-top-color', 'rgb(204, 204, 204)'),
        then.pageElementStyleShouldBe('border-top-left-radius', '6px'),
        then.pageIsClosed()
    )
);

runFeature(cardFeature);

module.exports = cardFeature;

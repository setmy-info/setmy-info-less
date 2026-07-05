/*
DTO layer for Gherkin test cases — this is the API.

Every Gherkin sentence used by the test suites is represented by one step DTO:
    { keyword: 'Given'|'When'|'Then', action: '<step id>', args: [...], text: '<gherkin sentence>' }

The DTOs are pure data: the runner (runner.js) executes them against pageHelper as
Jest e2e tests, and the writer (writer.js) serializes them back into .feature text,
so the same objects can be used as Gherkin test cases later.
*/

const SENTENCES = {
    pageNameIs: (name) => `page name is "${name}"`,
    pageIsRendered: () => 'page is rendered',
    pageElementIdIs: (elementId) => `page element ID is "${elementId}"`,
    pageShouldHaveTitle: (title) => `page should have title "${title}"`,
    pageElementMarginShouldBe: (margin) => `page element margin should be "${margin}"`,
    pageElementPaddingShouldBe: (padding) => `page element padding should be "${padding}"`,
    pageElementFontFamilyShouldBe: (fontFamily) => `page element font family should be "${fontFamily}"`,
    pageElementFontSizeShouldBe: (fontSize) => `page element font size should be "${fontSize}"`,
    pageElementXShouldBe: (x) => `page element X should be ${x}`,
    pageElementYShouldBe: (y) => `page element Y should be ${y}`,
    pageElementWidthShouldBe: (width) => `page element WIDTH should be ${width}`,
    pageElementHeightShouldBe: (height) => `page element HEIGHT should be ${height}`,
    pageElementTopShouldBe: (top) => `page element TOP should be ${top}`,
    pageElementLeftShouldBe: (left) => `page element LEFT should be ${left}`,
    pageElementBackgroundColorShouldBe: (color) => `page element background color should be "${color}"`,
    pageElementColorShouldBe: (color) => `page element color should be "${color}"`,
    pageElementStyleShouldBe: (propertyName, value) => `page element style "${propertyName}" should be "${value}"`,
    pageIsClosed: () => 'page is closed'
};

function step(keyword, action, ...args) {
    return {keyword, action, args, text: SENTENCES[action](...args)};
}

const given = {
    pageNameIs: (name) => step('Given', 'pageNameIs', name)
};

const when = {
    pageIsRendered: () => step('When', 'pageIsRendered'),
    pageElementIdIs: (elementId) => step('When', 'pageElementIdIs', elementId)
};

const then = {
    pageShouldHaveTitle: (title) => step('Then', 'pageShouldHaveTitle', title),
    pageElementMarginShouldBe: (margin) => step('Then', 'pageElementMarginShouldBe', margin),
    pageElementPaddingShouldBe: (padding) => step('Then', 'pageElementPaddingShouldBe', padding),
    pageElementFontFamilyShouldBe: (fontFamily) => step('Then', 'pageElementFontFamilyShouldBe', fontFamily),
    pageElementFontSizeShouldBe: (fontSize) => step('Then', 'pageElementFontSizeShouldBe', fontSize),
    pageElementXShouldBe: (x) => step('Then', 'pageElementXShouldBe', x),
    pageElementYShouldBe: (y) => step('Then', 'pageElementYShouldBe', y),
    pageElementWidthShouldBe: (width) => step('Then', 'pageElementWidthShouldBe', width),
    pageElementHeightShouldBe: (height) => step('Then', 'pageElementHeightShouldBe', height),
    pageElementTopShouldBe: (top) => step('Then', 'pageElementTopShouldBe', top),
    pageElementLeftShouldBe: (left) => step('Then', 'pageElementLeftShouldBe', left),
    pageElementBackgroundColorShouldBe: (color) => step('Then', 'pageElementBackgroundColorShouldBe', color),
    pageElementColorShouldBe: (color) => step('Then', 'pageElementColorShouldBe', color),
    pageElementStyleShouldBe: (propertyName, value) => step('Then', 'pageElementStyleShouldBe', propertyName, value),
    pageIsClosed: () => step('Then', 'pageIsClosed')
};

function scenario(name, ...steps) {
    return {scenario: name, steps};
}

function feature(name, ...scenarios) {
    return {feature: name, scenarios};
}

module.exports = {feature, scenario, given, when, then, step};

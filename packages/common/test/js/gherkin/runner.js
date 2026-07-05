/*
Executes Gherkin feature DTOs (see dto.js) as Jest e2e tests against pageHelper.
One Scenario = one Jest test; steps run sequentially in DTO order.
*/

const pageHelper = require('../pageHelper');

/* global describe, test, expect */

const ACTIONS = {
    pageNameIs: (name) => pageHelper.pageName(name),
    pageIsRendered: () => pageHelper.pageIsRendered(),
    pageElementIdIs: (elementId) => pageHelper.elementIdIs(elementId),
    pageShouldHaveTitle: async (title) => expect(await pageHelper.getTitle()).toBe(title),
    pageElementMarginShouldBe: (margin) => expect(pageHelper.data.computedStyles.margin).toBe(margin),
    pageElementPaddingShouldBe: (padding) => expect(pageHelper.data.computedStyles.padding).toBe(padding),
    pageElementFontFamilyShouldBe: (fontFamily) => expect(pageHelper.data.computedStyles.fontFamily).toBe(fontFamily),
    pageElementFontSizeShouldBe: (fontSize) => expect(pageHelper.data.computedStyles.fontSize).toBe(fontSize),
    pageElementXShouldBe: (x) => expect(pageHelper.data.computedStyles.x).toBe(x),
    pageElementYShouldBe: (y) => expect(pageHelper.data.computedStyles.y).toBe(y),
    pageElementWidthShouldBe: (width) => expect(pageHelper.data.computedStyles.width).toBe(width),
    pageElementHeightShouldBe: (height) => expect(pageHelper.data.computedStyles.height).toBe(height),
    pageElementTopShouldBe: (top) => expect(pageHelper.data.computedStyles.top).toBe(top),
    pageElementLeftShouldBe: (left) => expect(pageHelper.data.computedStyles.left).toBe(left),
    pageElementBackgroundColorShouldBe: (color) => expect(pageHelper.data.computedStyles.backgroundColor).toBe(color),
    pageElementColorShouldBe: (color) => expect(pageHelper.data.computedStyles.color).toBe(color),
    pageElementStyleShouldBe: (propertyName, value) => expect(pageHelper.data.computedStyles.allStyles[propertyName]).toBe(value),
    pageIsClosed: () => pageHelper.pageClose()
};

function runFeature(featureDto) {
    describe(`Feature: ${featureDto.feature}`, () => {
        for (const scenarioDto of featureDto.scenarios) {
            test(`Scenario: ${scenarioDto.scenario}`, async () => {
                // Always release the Selenium session and fixture server, even when a step
                // failed — a leaked grid session counts against the hub's max-session cap and
                // an open server handle keeps the Node event loop alive. pageClose() is
                // idempotent, so scenarios that already closed via pageIsClosed are unaffected.
                try {
                    for (const step of scenarioDto.steps) {
                        await ACTIONS[step.action](...step.args);
                    }
                } finally {
                    await pageHelper.pageClose();
                }
            });
        }
    });
}

module.exports = {runFeature, ACTIONS};

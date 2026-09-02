"use strict";

// Stylelint-config-standard, plus the few selectors this CSS API uses
// that the standard kebab-only patterns reject. Blank lines, media
// notation and indent are not overridden: prettier then stylelint --fix
// must produce a tree that already satisfies those rules.
const classAndIdPattern = "^[a-zA-Z][a-zA-Z0-9_-]*$";

function createStylelintConfig({ extraRules = {}, ignoreFiles } = {}) {
    return {
        customSyntax: "postcss-less",
        configBasedir: "src/main/less",
        extends: ["stylelint-config-standard"],
        rules: {
            "selector-class-pattern": classAndIdPattern,
            "selector-id-pattern": classAndIdPattern,
            "selector-type-no-unknown": [
                true,
                {
                    ignoreTypes: ["app"],
                },
            ],
            // Colours stay in the legacy comma form: `rgb(0 0 0 / 50%)` and
            // percentage alphas are CSS Color 4 and are not understood by the
            // old browsers this framework still supports. The base module's
            // colour tokens are written this way too.
            "color-function-notation": "legacy",
            "color-function-alias-notation": "with-alpha",
            "alpha-value-notation": "number",
            // Media queries stay in the min-/max- prefix form. Range notation
            // (`(width >= 640px)`) is Media Queries 4 and is ignored by the old
            // browsers this framework still supports, which would silently drop
            // the whole query rather than degrade.
            "media-feature-range-notation": "prefix",
            // `inset` is a logical-property shorthand and `overflow: x y` is the
            // two-value form; both are newer than the top/left/right/bottom and
            // single-value spellings this framework writes on purpose.
            "declaration-block-no-redundant-longhand-properties": [
                true,
                { ignoreShorthands: ["inset", "overflow"] },
            ],
            ...extraRules,
        },
        ignoreFiles,
    };
}

module.exports = { createStylelintConfig };

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
            ...extraRules,
        },
        ignoreFiles,
    };
}

module.exports = { createStylelintConfig };

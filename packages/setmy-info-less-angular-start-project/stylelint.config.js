const { createStylelintConfig } = require("../../stylelint.base.cjs");

// src/main/less/components mirrors the Angular workspace's src/app/components tree
// file for file, so the component LESS keeps the structure the Angular sources have:
// a file states its own rules first and imports its partials at the end, and the
// cascade order of those rules is what the application relies on. Both rules below
// would require reordering that CSS, which is exactly what a 1:1 mirror must not do.
module.exports = createStylelintConfig({
    extraRules: {
        "no-invalid-position-at-import-rule": null,
        "no-descending-specificity": null,
    },
    ignoreFiles: ["**/node_modules/**", "**/dist/**"],
});

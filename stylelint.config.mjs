// Single lint configuration for every package, the way the sibling
// `setmy.info-js` repo keeps one root `eslint.config.mjs`. stylelint resolves
// it by searching upward from each linted file, so `npm run lint` works both
// from the root and from inside a package.
//
// stylelint owns `.less` formatting here as well as linting - prettier is
// excluded from `.less` on purpose (see .prettierignore).
export default {
    customSyntax: "postcss-less",
    extends: ["stylelint-config-standard"],
    rules: {
        // The framework declares intentionally empty rule blocks as
        // placeholders in the skeleton packages.
        "block-no-empty": null,
        // Class and id names follow this framework's own camelCase,
        // behavior-first convention (.centerText, .verticalStretchPanel),
        // not stylelint-config-standard's kebab-case default.
        "selector-class-pattern": null,
        "selector-id-pattern": null,
        // The device breakpoints are written as min-width/max-width on
        // purpose (see README "Responsive principles").
        "media-feature-range-notation": "prefix",
        // `app` is the Angular start project's custom element.
        "selector-type-no-unknown": [true, { ignoreTypes: ["app"] }],
    },
    ignoreFiles: ["**/node_modules/**", "**/dist/**"],
    overrides: [
        {
            files: ["packages/setmy-info-less-extended/**/*.less"],
            rules: {
                "declaration-property-value-no-unknown": null,
            },
        },
    ],
};

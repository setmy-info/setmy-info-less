module.exports = {
    customSyntax: 'postcss-less',
    configBasedir: "src/main/less",
    extends: [
        'stylelint-config-standard'
    ],
    rules: {
        'block-no-empty': null,//true
        'selector-class-pattern': null,
        'selector-id-pattern': null,
        'media-feature-range-notation': 'prefix',
        'declaration-property-value-no-unknown': null,
        "selector-type-no-unknown": [true, {
            ignoreTypes: ["app"]
        }],
    },
    ignoreFiles: [
        '**/node_modules/**',
        '**/dist/**',
        '**/experimental/**'
    ]
};

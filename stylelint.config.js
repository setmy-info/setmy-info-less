module.exports = {
    customSyntax: 'postcss-less',
    configBasedir: "src/main/less",
    extends: [
        'stylelint-config-standard'
    ],
    rules: {
        'block-no-empty': null,//true
        'selector-class-pattern': null,
        'media-feature-range-notation': 'prefix',
        "selector-type-no-unknown": [true, {
            ignoreTypes: ["app"]
        }],
    },
    ignoreFiles: [
        '**/node_modules/**',
        '**/dist/**'
    ]
};

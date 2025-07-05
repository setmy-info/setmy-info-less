module.exports = {
    default: [
        `--format-options '{"snippetInterface": "synchronous"}'`,
        '--require ./src/test/js/stepDefinitions.js',
        './src/test/gherkin'
    ].join(' ')
};

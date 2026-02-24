module.exports = {
    default: [
        `--format-options '{"snippetInterface": "synchronous"}'`,
        '--require ../common/test/js/bdd/given.js',
        '--require ../common/test/js/bdd/when.js',
        '--require ../common/test/js/bdd/then.js',
        './src/test/gherkin'
    ].join(' ')
};

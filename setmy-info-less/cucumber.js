module.exports = {
    default: [
        `--format-options '{"snippetInterface": "synchronous"}'`,
        '--require ./src/test/js/bdd/given.js',
        '--require ./src/test/js/bdd/when.js',
        '--require ./src/test/js/bdd/then.js',
        './src/test/gherkin'
    ].join(' ')
};

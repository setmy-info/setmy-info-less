const pug = require('pug');
const fs = require('fs');
const path = require('path');

const pageNames = [
    "body",
    "app",
    "application"
];

function main() {
    for (let i = 0; i < pageNames.length; i++) {
        let pageName = pageNames[i];
        compilePug(pageName, {title: pageName + ".html"});
    }
}

function compilePug(name, locals = {}) {
    const pugFile = path.join(__dirname, '../pug/' + name + ".pug");
    const htmlFile = path.join(__dirname, '../../../dist/' + name + ".html");
    const compiledFunction = pug.compileFile(pugFile);
    fs.writeFileSync(htmlFile, compiledFunction(locals));
    console.log('Pug template compiled to HTML successfully.');
}

main();

module.exports = {
    compilePug
};

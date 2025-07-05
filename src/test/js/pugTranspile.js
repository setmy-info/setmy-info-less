const pug = require('pug');
const fs = require('fs');
const path = require('path');

function transpileHtml(name, locals = {}) {
    const pugFile = path.join(__dirname, '../pug/' + name + ".pug");
    const htmlFile = path.join(__dirname, '../../../dist/' + name + ".html");
    const compiledFunction = pug.compileFile(pugFile);
    fs.writeFileSync(htmlFile, compiledFunction(locals));
    console.log(`✔ Compiled: ${pugFile} → ${htmlFile}`);
}

module.exports = {
    transpileHtml
};

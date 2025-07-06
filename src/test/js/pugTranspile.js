const pug = require('pug');
const fs = require('fs');
const path = require('path');

function transpileHtml(name, locals = {}) {
    const outputName = locals.page || name;
    const pugFile = path.join(__dirname, '../pug/' + name + ".pug");
    const htmlFile = path.join(__dirname, '../../../dist/' + outputName + ".html");
    const compiledFunction = pug.compileFile(pugFile);
    fs.writeFileSync(htmlFile, compiledFunction(locals));
    console.log(`✔ Compiled: ${pugFile} → ${htmlFile}`);
}

module.exports = {
    transpileHtml
};

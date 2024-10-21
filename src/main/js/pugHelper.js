const pug = require('pug');
const fs = require('fs');
const path = require('path');

function compilePug(name) {
    const pugFile = path.join(__dirname, '../pug/' + name + ".pug");
    const htmlFile = path.join(__dirname, '../../../dist/' + name + ".html");
    const compiledFunction = pug.compileFile(pugFile);
    fs.writeFileSync(htmlFile, compiledFunction());
    console.log('Pug template compiled to HTML successfully.');
}

compilePug("index");


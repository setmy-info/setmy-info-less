const fs = require('fs');
const path = require('path');
const pugTranspile = require('./pugTranspile');

const inputDir = path.join(__dirname, '../pug');

function main() {
    console.log('Watching .pug files for changes...');

    fs.watch(inputDir, {recursive: false}, (eventType, filename) => {
        if (filename && filename.endsWith('.pug')) {
            const pageName = path.basename(filename, path.extname(filename));
            console.log(`Rebuilding ${filename}...`);
            try {
                pugTranspile.transpileHtml(pageName, {title: pageName + ".html"});
            } catch (e) {
                console.error(e);
            }
        }
    });
}

main();
